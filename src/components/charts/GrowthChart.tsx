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
  data: { name: string; net_profit: number }[];
  strokeColor?: string;
  fillColor?: string;
}

const GrowthChart: React.FC<ChartAreaProps> = ({
  data,
  strokeColor = " #3896e7",
  fillColor = "#00f2fe",
}) => {
  return (
    <div className="rounded-xl p-1 lg:p-2  w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.2}/>
          <XAxis dataKey="name" stroke="#bbb" tick={{ fill: "#bbb", fontSize: 12 }}/>
          <YAxis stroke="#bbb" tick={{ fill: "#bbb", fontSize: 12 }}/>
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
              <stop offset="95%" stopColor={fillColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="net_profit"
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
