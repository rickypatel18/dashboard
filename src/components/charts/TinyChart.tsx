"use client";
import * as React from "react";
import { LineChart, Line, XAxis } from "recharts";

interface TinyChartProps {
  data: any[];
  dataKey: string;
  color?: string;
  height?: number;
  width?: number;
}

export default function TinyChart({
  data,
  dataKey,
  color = "#8884d8",
  height = 70,
  width = 90,
}: TinyChartProps) {
  return (
    <LineChart width={width} height={height} data={data}>
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
}
