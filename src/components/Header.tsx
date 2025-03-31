"use client";
import { Bell, Maximize, Menu, Search, Settings, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./MenubarDemo";
import { useTheme } from "next-themes";
import { SelectDemo } from "./SelectDemo";

const Header = ({
  isSidebarExpanded,
  toggleSidebar,
}: {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}) => {

  const { theme, setTheme } = useTheme();
    // Apply stored theme on first load
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
    }, [setTheme]);
  
    // Update localStorage whenever theme changes
    useEffect(() => {
      if (theme) {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    }, [theme]);


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      {/* Search Drawer */}
      <div
        className={`fixed  top-0 left-1/2 transform -translate-x-1/2 w-full h-fit max-w-2xl bg-[#1a1919] transition-all duration-300 overflow-hidden flex items-start justify-center z-20  ${
          isSearchOpen ? "h-[30vh] opacity-100" : "h-0 opacity-0"
        }`}
        ref={searchBoxRef}
      >
        {isSearchOpen && (
          <div className="flex flex-col w-full py-10 px-10 lg:py-15 lg:px-20 gap-4">
            <div className="flex justify-end">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-white"
              >
                <X />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">
                What are you looking for?
              </h2>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search..." className="flex-1" />
              <Button variant="outline" className="text-white">
                Search
              </Button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed px-4 top-0 transition-all duration-100 bg-[#110f0f] h-14 lg:h-16 flex items-center justify-between left-0 lg:left-20 w-full z-10  ${
          isSidebarExpanded
            ? "lg:left-64 lg:w-[calc(100%-16rem)]"
            : "lg:left-20 lg:w-[calc(100%-5rem)]"
        }`}
      >
        <div className="flex flex-row gap-2">
          {!isSidebarExpanded ? (
            // Show logo on small screens when sidebar is collapsed
            <div className="flex w-fit h-8  lg:hidden ">
              <img src="/logo.svg" alt="Logo" width={30} height={30} />
            </div>
          ) : (
            // Show full logo when expanded
            <div className="flex flex-row">
              <div className="flex lg:hidden">
                <img src="/logo.svg" alt="Logo" width={30} height={30} />
                <div className="text-2xl pb-2">gnext</div>
              </div>
            </div>
          )}

          {/* Single Toggle Button */}
          <button onClick={toggleSidebar} className="bg-transparent text-white">
            {isSidebarExpanded ? <X /> : <Menu />}
          </button>
        </div>

        <div className="flex gap-3 lg:gap-10 items-center justify-center ">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative flex items-center justify-center cursor-pointer w-fit"
          >
            <Search className="w-5 lg:w-7 text-white dark:text-[var(--foreground)]" />
          </button>
          <div className="relative flex items-center justify-center cursor-pointer w-fit">
            <SelectDemo />
          </div>
          <div className="relative flex items-center justify-center cursor-pointer w-fit">
            <ThemeToggle theme={theme ?? "light"} setTheme={setTheme}/>
          </div>
          <div className="relative hidden lg:flex items-center justify-center cursor-pointer w-fit">
            <Bell />
          </div>
          <div className="relative flex items-center justify-center cursor-pointer w-fit ">
            <UserMenu />
          </div>
          <div className="relative hidden lg:flex items-center justify-center cursor-pointer w-fit">
            <Maximize />
          </div>
          <div className="relative flex items-center justify-center cursor-pointer w-fit ">
            <Settings className="w-5 lg:w-7" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
