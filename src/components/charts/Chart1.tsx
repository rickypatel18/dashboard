"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { name: "jan", unique_visitor: 4000, page_visitor: 2400 },
  { name: "feb", unique_visitor: 3000, page_visitor: 1398 },
  { name: "mar", unique_visitor: 2000, page_visitor: 9800 },
  { name: "apr", unique_visitor: 2780, page_visitor: 3908 },
  { name: "may", unique_visitor: 1890, page_visitor: 4800 },
  { name: "jun", unique_visitor: 2390, page_visitor: 3800 },
  { name: "jul", unique_visitor: 3490, page_visitor: 4300 },
  { name: "aug", unique_visitor: 3000, page_visitor: 1398 },
  { name: "sep", unique_visitor: 2000, page_visitor: 9800 },
  { name: "oct", unique_visitor: 2780, page_visitor: 3908 },
  { name: "nov", unique_visitor: 1890, page_visitor: 4800 },
  { name: "dec", unique_visitor: 2390, page_visitor: 3800 },
];

export default function Chart1() {
  return (
    <ResponsiveContainer width="100%" height={400} >
      <BarChart
        data={data}
        // margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        barGap={10}
        barCategoryGap={10}
      >
        {/* Grid and Axis Styling */}
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 11 }} />
        <YAxis tick={{ fill: "#aaa", fontSize: 11 }} />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            padding: "10px",
          }}
          cursor={{ fill: "rgba(255,255,255,0.1)" }}
        />

        <Legend />

        {/* Stacked Bars */}
        <Bar dataKey="page_visitor" fill="#8884d8" stackId="visitors" />
        <Bar
          dataKey="unique_visitor"
          fill="#82ca9d"
          stackId="visitors"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
