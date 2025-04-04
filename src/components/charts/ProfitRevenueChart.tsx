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
  data: { name: string; profit: number; revenue: number }[];
  barColors?: { revenue: string; profit: string };
}

// Adjust label position to prevent cutoff
const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 20} // Moved higher to prevent cutoff
      fill="#bbb"
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
      <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-xl ">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p>profit: {payload[0].value}</p>
        <p>revenue : {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const ProfitRevenueChart: React.FC<ChartProps> = ({
  data,
  barColors = { revenue: "#8884d8", profit: "#4facfe" },
}) => {
  return (
    <div className="w-full lg:pr-3  rounded-xl h-full">
      <ResponsiveContainer width="100%">
        <BarChart
          data={data}
          margin={{ top: 50, right: 4, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#444"
            strokeOpacity={0.2}
          />
          <XAxis
            dataKey="name"
            stroke="#bbb"
            tick={{ fill: "#bbb", fontSize: 12 }}
          />
          <YAxis
            stroke="#bbb"
            domain={["auto"]}
            tick={{ fill: "#bbb", fontSize: 12 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar dataKey="revenue" fill={barColors.revenue} radius={[8, 8, 0, 0]}>
            <LabelList dataKey="revenue" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="profit" fill={barColors.profit} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitRevenueChart;
