"use client";
import React, { useState } from "react";

const flags = [
  { id: "india", src: "/indiaflag.svg", label: "India" },
  { id: "uk", src: "/ukflag.svg", label: "UK" },
];

export function SelectDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleFlag = () => {
    setSelectedIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  return (
    <label className="relative flex items-center gap-1 bg-gray-800 rounded-full cursor-pointer w-fit border border-gray-700">
      <input
        type="checkbox"
        checked={selectedIndex === 1}
        onChange={toggleFlag}
        className="hidden"
      />

      <div
        className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white border-1 border-black transition-all duration-500 ${
          selectedIndex === 1 ? "translate-x-12" : "translate-x-1"
        }`}
      ></div>

      <div
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ${
          selectedIndex === 0 ? "scale-110 opacity-100" : "opacity-50"
        }`}
      >
        <img
          src={flags[0].src}
          alt={flags[0].label}
          className="w-5 h-5 rounded-full"
        />
      </div>

      <div
        className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ${
          selectedIndex === 1 ? "scale-110 opacity-100" : "opacity-50"
        }`}
      >
        <img
          src={flags[1].src}
          alt={flags[1].label}
          className="w-5 h-5 rounded-full"
        />
      </div>
    </label>
  );
}
