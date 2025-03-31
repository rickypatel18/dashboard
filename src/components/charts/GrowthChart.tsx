"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartAreaProps {
  data: { name: string; uv: number; pv: number; amt: number }[];
  strokeColor?: string;
  fillColor?: string;
}

const GrowthChart: React.FC<ChartAreaProps> = ({
  data,
  strokeColor = "#8884d8",
  fillColor = "#8884d8",
}) => {
  return (
    <div className=" bg-gray-900 rounded-xl p-1 lg:p-2  w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ddd" />
          <YAxis stroke="#ddd" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="uv"
            stroke={strokeColor}
            strokeWidth={2}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
