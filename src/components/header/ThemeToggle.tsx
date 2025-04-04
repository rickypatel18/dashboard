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

  if (!mounted)
    return <div className="w-5 h-5 animate-pulse bg-gray-300 rounded-full" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-all duration-300 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-5 lg:w-7 text-yellow-200" />
      ) : (
        <Moon className="w-5 lg:w-7 text-gray-200" />
      )}
    </button>
  );
}
