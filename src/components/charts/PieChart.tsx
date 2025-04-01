"use client";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { useTheme } from "next-themes";  // Use next-themes' useTheme hook


interface Data {
  name: string;
  value: number;
  color: string;
}

interface ChartPieProps {
  data: Data[]; // Accept data as a prop
}

const renderActiveShape = (props: any, textColor: string) => {  // Accept textColor as a parameter
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* Title in the Center */}
      <text
        x={cx}
        y={cy}
        dy={3}
        textAnchor="middle"
        fontSize={14}
        fontWeight="bold"
        fill={textColor} // Use dynamic text color
      >
        {payload.name}
      </text>

      {/* Main Active Sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke={textColor}
        strokeWidth={2}
        style={{ filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" }}
      />

      {/* Outer Highlight Effect */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        opacity={0.6}
      />

      {/* Line Pointer to Label */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        strokeWidth={2}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none" />

      {/* Value Labels */}
      <text
        x={ex + (cos >= 0 ? 6 : -6)}
        y={ey}
        textAnchor={textAnchor}
        fontSize={12}
        fill="#A1A1AA"
      >
        {`Value: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 6 : -6)}
        y={ey + 15}
        textAnchor={textAnchor}
        fontSize={12}
        fill="#A1A1AA"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const ChartPie = ({ data }: ChartPieProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();  // Use next-themes' useTheme hook
  const textColor = theme === "dark" ? "white" : "black"; // Set text color based on theme

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full dark:bg-gray-900 rounded-xl ">
      <PieChart width={500} height={390}>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props: any) => renderActiveShape(props, textColor)}  
          data={data}
          innerRadius={90}
          outerRadius={130}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ChartPie;
