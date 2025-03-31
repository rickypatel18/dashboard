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
        console.log(result);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!data) return null;

  const cardInfo = [
    {
      title: "Customers",
      key: "customers",
      dataKey: "customer",
      color: "#8884d8",
    },
    { title: "Orders", key: "orders", dataKey: "order", color: "#82ca9d" },
    { title: "Revenue", key: "revenue", dataKey: "revenue", color: "#ffc658" },
    { title: "Profits", key: "profits", dataKey: "profit", color: "#ff7300" },
  ];

  // Function to calculate percentage change
  const calculatePercentageChange = (values: number[]) => {
    if (values.length < 2) return 0; // Not enough data points

    const lastValue = values[values.length - 1]; // Latest month
    const secondLastValue = values[values.length - 2]; // Previous month
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;

    const change = ((lastValue - secondLastValue) / average) * 100;
    return change.toFixed(2); // Keep 2 decimal places
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-5">
      {cardInfo.map((card) => {
        const values = data[card.key]?.map((item: any) => item[card.dataKey]) || [];
        const percentageChange = calculatePercentageChange(values);

        return (
          <div
            key={card.key}
            className="flex justify-between items-center bg-gray-900 px-4 py-7 rounded-xl opacity-90"
          >
            <div className="flex gap-3">
              <div className="p-1 lg:p-2 rounded-full bg-amber-200 flex w-fit h-fit">
                <Users />
              </div>
              <div className="flex flex-col items-start gap-5 justify-center">
                <div className="flex flex-col gap-1">
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
            <div className="flex flex-col justify-center items-center">
              <TinyChart data={data[card.key]} dataKey={card.dataKey} color={card.color} />
              <div className="flex flex-col">
                <p className="text-md lg:text-lg">{percentageChange}%</p>
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
