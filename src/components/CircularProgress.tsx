"use client";
import React, { useEffect, useState } from "react";

interface WaterProgressProps {
  percentage: number; // Value from 0 to 100
  size?: number; // Circle size
  color?: string; // Water color
  bgColor?: string; // Background color
  speed?: number; // Animation speed in seconds
}

const WaterProgress: React.FC<WaterProgressProps> = ({
  percentage,
  size = 150,
  color = "#009acd",
  bgColor = "#222",
  speed = 3,
}) => {
  const [waveOffset, setWaveOffset] = useState(0);
  const fillHeight = (100 - percentage) * 0.8; // Convert percentage to wave height

  // Wave movement effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev >= 100 ? 0 : prev + 1));
    }, speed * 10);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background Circle */}
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={bgColor}
          strokeWidth="4"
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
          <path
            d={`M 0 ${fillHeight + 10} 
                Q 25 ${fillHeight - 5}, 50 ${fillHeight + 5} 
                T 100 ${fillHeight + 10} 
                V 100 H 0 Z`}
            fill={color}
            className="wave-animation"
            style={{
              transform: `translateX(${waveOffset}px)`,
              transition: "transform 0.2s linear",
            }}
          />
        </g>
      </svg>

      {/* Percentage Display */}
      <div className="absolute text-white font-bold text-xl">{percentage}%</div>

      {/* Wave Animation (CSS) */}
      <style>
        {`
          @keyframes waveMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(5px); transform: translateY(5px); }
          }
          .wave-animation {
            animation: waveMove ${speed}s infinite linear ;
          }
        `}
      </style>
    </div>
  );
};

export default WaterProgress;
