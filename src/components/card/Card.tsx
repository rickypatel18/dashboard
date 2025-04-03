"use client";
import { MoveRight, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import TinyChart from "../charts/TinyChart";

const Card = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error("Failed to fetch card data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return  <div className="text-center text-lg font-medium text-gray-500 py-6 animate-pulse">
  Loading...
</div>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!data) return null;

  const cardInfo = [
    { title: "Customers", key: "customers", dataKey: "customer", color: "#6A5ACD" }, // Slate Blue
    { title: "Orders", key: "orders", dataKey: "order", color: "#2ECC71" }, // Green
    { title: "Revenue", key: "revenue", dataKey: "revenue", color: "#F1C40F" }, // Yellow
    { title: "Profits", key: "profits", dataKey: "profit", color: "#E74C3C" }, // Red
  ];
  

  // Function to calculate percentage change
  const calculatePercentageChange = (values: number[]) => {
    if (values.length < 2) return "0.00"; // Ensure return type is string

    const lastValue = values[values.length - 1]; // Latest month
    const secondLastValue = values[values.length - 2]; // Previous month
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;

    const change = ((lastValue - secondLastValue) / average) * 100;
    return change.toFixed(2); // Always return string
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-5">
      {cardInfo.map((card) => {
        const values =
          data[card.key]?.map((item: any) => item[card.dataKey]) || [];
          // console.log(values);
          
        const percentageChange = calculatePercentageChange(values);

        return (
          <div
            key={card.key}
            className="flex justify-between items-center text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl px-4 py-7 "
          >
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-amber-200 flex w-fit h-fit">
                <Users className="w-6" />
              </div>
              <div className="flex flex-col items-start gap-5 justify-center">
                <div className="flex flex-col gap-0">
                  <p className="text-sm lg:text-md">{card.title}</p>
                  <p className="text-lg lg:text-2xl">
                    {values.reduce((acc: number, num: number) => acc + num, 0)}
                  </p>
                </div>
                <button className="flex justify-center items-center gap-2 text-md lg:text-lg">
                  <p>View all</p>
                  <MoveRight className="w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ">
              <TinyChart
                data={data[card.key]}
                dataKey={card.dataKey}
                color={card.color}
              />
              <div className="flex flex-col">
                <p
                  className={`text-md lg:text-lg ${
                    parseFloat(percentageChange) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {percentageChange}%
                </p>
                <p className="text-sm">last two months</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
