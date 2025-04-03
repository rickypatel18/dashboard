"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-all duration-300 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-5 lg:w-7 text-yellow-200" />
      ) : (
        <Moon className="w-5 lg:w-7  " />
      )}
    </button>
  );
}
  