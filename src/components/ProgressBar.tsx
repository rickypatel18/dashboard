"use client";
import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color = "bg-blue-500",
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {/* Label */}
      <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
        <span>{label}</span>
        <span>
          {value} / {max}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-lg h-4 relative overflow-hidden">
        <div
          className={`h-full ${color} rounded-lg transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// ✅ Multi-progress bars component
const MultiProgressBars = () => {
  const progressData = [
    { label: "Task 1", value: 110, max: 150, color: "bg-blue-500" },
    { label: "Task 2", value: 2000, max: 3000, color: "bg-green-500" },
    { label: "Task 3", value: 428, max: 545, color: "bg-yellow-500" },
    { label: "Task 4", value: 600, max: 800, color: "bg-red-500" }, // Example extra
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4 bg-gray-900 p-6 rounded-lg shadow-lg">
      {progressData.map((item, index) => (
        <ProgressBar
          key={index}
          label={item.label}
          value={item.value}
          max={item.max}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default MultiProgressBars;
