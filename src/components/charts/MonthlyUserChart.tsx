"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // ✅ Import next-themes
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

interface MonthlyUserChartProps {
  apiUrl?: string;
  barColor?: string;
  gradientId?: string;
}

const MonthlyUserChart: React.FC<MonthlyUserChartProps> = ({
  apiUrl = "/api/visitors",
  gradientId = "barGradient",
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [barSpacing, setBarSpacing] = useState({
    barGap: 10,
    barCategoryGap: 15,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setChartData(data);
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  // // Handle responsive spacing
  // useEffect(() => {
  //   function updateSpacing() {
  //     if (typeof window !== "undefined") {
  //       setBarSpacing(
  //         window.innerWidth < 640
  //           ? { barGap: 5, barCategoryGap: 5 }
  //           : { barGap: 15, barCategoryGap: 20 }
  //       );
  //     }
  //   }
  //   updateSpacing();
  //   window.addEventListener("resize", updateSpacing);
  //   return () => window.removeEventListener("resize", updateSpacing);
  // }, []);

  if (loading)
    return (
      <div className="text-center text-lg font-medium text-gray-500 py-6 animate-pulse">
        Loading...
      </div>
    );
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="py-5 rounded-xl flex flex-col gap-5  ">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          barGap={barSpacing.barGap}
          barCategoryGap={barSpacing.barCategoryGap}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isDarkMode ? "#1c94e4" : "#00f2fe"}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={isDarkMode ? "#00f2fe" : "#1c94e4"}
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="name" tick={{ fill: "#bbb", fontSize: 12 }} />
          <YAxis tick={{ fill: "#bbb", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              padding: "10px",
            }}
            cursor={{ fill: "rgba(255,255,255,0)" }}
          />
          <Legend wrapperStyle={{ color: "#ddd" }} />
          <Bar
            dataKey="Visitor"
            fill={`url(#${gradientId})`}
            stackId="visitors"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUserChart;
