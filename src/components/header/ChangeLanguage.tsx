"use client";
import React, { useState } from "react";

const flags = [
  { id: "india", src: "/indiaflag.svg", label: "India" },
  { id: "uk", src: "/ukflag.svg", label: "UK" },
];

export function ChangeLanguage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleFlag = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  return (
    <label className="relative flex items-center gap-0  dark:bg-gray-800 rounded-full cursor-pointer w-fit border-[0.5px] border-[#5f636950] ">
      <input
        type="checkbox"
        checked={selectedIndex === 1}
        onChange={toggleFlag}
        className="hidden"
      />

      <div
        className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-800 dark:bg-white  transition-all duration-500 ${
          selectedIndex === 1
            ? "translate-x-10.5 lg:translate-x-9.5"
            : "translate-x-1.5 lg:translate-x-0.5"
        }`}
      ></div>

      <div
        className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-500 ${
          selectedIndex === 0 ? "scale-110 opacity-100" : "opacity-50"
        }`}
      >
        <img
          src={flags[0].src}
          alt={flags[0].label}
          className="w-4 h-4 lg:w-5 lg:h-5 rounded-full"
        />
      </div>

      <div
        className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-500 ${
          selectedIndex === 1 ? "scale-110 opacity-100" : "opacity-50"
        }`}
      >
        <img
          src={flags[1].src}
          alt={flags[1].label}
          className="w-4 h-4 lg:w-5 lg:h-5 rounded-full"
        />
      </div>
    </label>
  );
}
