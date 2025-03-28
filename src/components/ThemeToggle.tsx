"use client";
import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6 text-yellow-400 transition-all duration-300" />
      ) : (
        <Moon className="w-6 h-6 text-gray-300 transition-all duration-300" />
      )}
    </button>
  );
}
