"use client";
import React, { useState, useEffect } from "react";
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
  apiUrl?: string; // Allow dynamic API endpoint
  barColor?: string; // Allow dynamic bar color
  gradientId?: string; // Gradient ID
}

const MonthlyUserChart: React.FC<MonthlyUserChartProps> = ({
  apiUrl = "/api/visitors",
  barColor = "#4facfe",
  gradientId = "barGradient",
}) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [barSpacing, setBarSpacing] = useState({
    barGap: 10,
    barCategoryGap: 15,
  });

  // Fetch data from API
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
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  // Handle responsive spacing
  useEffect(() => {
    function updateSpacing() {
      if (typeof window !== "undefined") {
        setBarSpacing(
          window.innerWidth < 640
            ? { barGap: 5, barCategoryGap: 5 }
            : { barGap: 15, barCategoryGap: 20 }
        );
      }
    }
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="py-2 bg-gray-900 rounded-xl flex flex-col gap-5">
      <h2 className="text-white text-lg font-semibold text-center">
        Monthly Visitors
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          barGap={barSpacing.barGap}
          barCategoryGap={barSpacing.barCategoryGap}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4facfe" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#4facfe" stopOpacity={0.3} />
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
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
          />
          <Legend wrapperStyle={{ color: "#ddd" }} />
          <Bar
            dataKey="Visitor"
            fill={`url(#${gradientId})`} // Use gradient
            stackId="visitors"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUserChart;
