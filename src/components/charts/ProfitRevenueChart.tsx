"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { name: string; uv: number; pv: number; amt: number }[];
  barColors?: { pv: string; uv: string };
}

// Adjust label position to prevent cutoff
const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 20} // Moved higher to prevent cutoff
      fill="#fff"
      textAnchor="middle"
      fontSize={12}
      fontWeight="bold"
    >
      {value}
    </text>
  );
};

// Custom Tooltip (removes white background effect)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p>UV: {payload[0].value}</p>
        <p>PV: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const ProfitRevenueChart: React.FC<ChartProps> = ({
  data,
  barColors = { pv: "#8884d8", uv: "#82ca9d" },
}) => {
  return (
    <div className="w-full mx-auto p-4 bg-gray-900 rounded-lg shadow-lg h-full">
      <ResponsiveContainer width="100%" >
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 20, bottom: 10 }} // Added top margin
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ddd" />
          <YAxis stroke="#ddd" domain={['auto', 'dataMax + 500']} /> {/* Extra space at top */}
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Legend wrapperStyle={{ color: "#fff" }} />

          <Bar dataKey="pv" fill={barColors.pv} radius={[8, 8, 0, 0]}>
            <LabelList dataKey="pv" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="uv" fill={barColors.uv} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitRevenueChart;
