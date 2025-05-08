"use client";

// for smooth scrolling

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

//////////////////////////
type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
};
type SmoothScrollerContextType = LenisInstance | null;

interface ScrollContextProps {
  children: React.ReactNode;
}
// /////////////////////

const smoothScrollerContext = createContext<SmoothScrollerContextType>(null);

export const useSmoothScroller = () => useContext(smoothScrollerContext);

const ScrollContext = ({ children }: ScrollContextProps) => {
  const [lenisRef, setLenisRef] = useState<LenisInstance | null>(null);
  const [rafState, setraf] = useState<number | null>(null);

  useEffect(() => {
    const scroller = new Lenis();
    let rf;

    function raf(time: number) {
      scroller.raf(time);
      rf = requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setraf(rf);
    setLenisRef(scroller);

    return () => {
      if (lenisRef) {
        cancelAnimationFrame(rafState ?? 0);   // ?? 0 is a fallback value if rafState is null just to avoid typeScript error
        lenisRef.destroy();
      }
    };
  }, []);
  return (
    <smoothScrollerContext.Provider value={lenisRef}>
      {children}
    </smoothScrollerContext.Provider>
  );
};

export default ScrollContext;
