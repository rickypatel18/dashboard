"use client";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "Laptop", value: 1624, color: "#FF6384" },
  { name: "Mobile", value: 1267, color: "#36A2EB" },
  { name: "Pc", value: 1153, color: "#FFCE56" },
  { name: "Tablet", value: 679, color: "#4BC0C0" },
];

const renderActiveShape = (props: any) => {
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
        fill="#fff"
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
        stroke="#fff"
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
        fill="#fff"
      >
        {`Value: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 6 : -6)}
        y={ey + 15}
        textAnchor={textAnchor}
        fontSize={12}
        fill="#ccc"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export default function ChartPie() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-900  rounded-lg shadow-md ">
      <PieChart width={500} height={450}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
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
}
