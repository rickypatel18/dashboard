"use client";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
}

interface ProgressData {
  label: string;
  value: number;
  max: number;
  color: string;
}

const ProgressBar = ({
  value,
  max,
  label,
  color = "bg-blue-500",
}: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium text-gray-300">
        <span>{label}</span>
        <span className="text-gray-400">
          {value} / {max}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#ddd] dark:bg-gray-800 rounded-full h-5 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }} // Start from 0 width
          animate={{ width: `${percentage}%` }} // Animate to actual percentage
          transition={{ duration: 1, ease: "easeInOut" }} // Smooth left-to-right effect
          className={`h-full ${color} rounded-full`}
          style={{
            backgroundImage: "linear-gradient(to right, #4facfe, #00f2fe)",
          }}
        />
      </div>
    </div>
  );
};

const MultiProgressBars = ({
  progressData,
}: {
  progressData: ProgressData[];
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-xl space-y-5">
      <h2 className=" text-xl font-semibold text-center text-[var(--color-secondary)] py-2">
       Task Progress Overview
      </h2>
      {progressData.map((item, index) => (
        <ProgressBar key={index} {...item} />
      ))}
    </div>
  );
};

export default MultiProgressBars;
