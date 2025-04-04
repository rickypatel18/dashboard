"use client";
import React from "react";
import "@/styles/wave.css";

interface WaterProgressProps {
  percentage: number; // Value from 0 to 100
  size?: number; // Circle size
  color?: string; // Wave color
}

const WaterProgress = ({
  percentage,
  size = 150,
  color = " #4facfe",
}: WaterProgressProps) => {
  const fillHeight = (100 - percentage) * 0.8; // Convert percentage to wave height

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {/* Background Circle */}
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#00f2fe"
          strokeWidth="0.7"
          fill="transparent"
        />
      </svg>

      {/* Water Wave Animation */}
      <svg
        className="absolute top-0 left-0"
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <clipPath id="wave-clip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
        <g clipPath="url(#wave-clip)">
          {/* Two overlapping waves for a realistic effect */}
          <path
            d={`M 0 ${fillHeight + 10} 
                Q 25 ${fillHeight - 5}, 50 ${fillHeight + 5} 
                T 100 ${fillHeight + 10} 
                V 100 H 0 Z`}
            fill={color}
            className="wave wave1"
          />
          <path
            d={`M 0 ${fillHeight + 15} 
                Q 25 ${fillHeight}, 50 ${fillHeight + 10} 
                T 100 ${fillHeight + 15} 
                V 100 H 0 Z`}
            fill={color}
            className="wave wave2"
            style={{ opacity: 0.6 }}
          />
        </g>
      </svg>

      <div className="absolute  font-bold text-2xl">{percentage}%</div>
    </div>
  );
};

export default WaterProgress;
