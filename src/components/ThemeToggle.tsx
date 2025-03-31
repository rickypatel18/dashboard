"use client";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="w-5 lg:w-7 text-yellow-300" />
      ) : (
        <Moon className="w-5 lg:w-7 text-gray-300" />
      )}
    </button>
  );
}
