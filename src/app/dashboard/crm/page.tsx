"use client";

import Card from "@/components/card/Card";
import MonthlyUserChart from "@/components/charts/MonthlyUserChart";
import GrowthChart from "@/components/charts/GrowthChart";
import ChartPie from "@/components/charts/PieChart";
import ProfitRevenueChart from "@/components/charts/ProfitRevenueChart";
import CircularProgress from "@/components/charts/CircularProgress";
import MultiProgressBars from "@/components/charts/ProgressBar";
import LeadTable from "@/components/table/LeadTable";
import UserTable from "@/components/table/UserTable";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const profitRevenueData = [
  { name: "2020", profit: 2239, revenue: 6596 },
  { name: "2021", profit: 1280, revenue: 3908 },
  { name: "2022", profit: 1790, revenue: 4740 },
  { name: "2023", profit: 990, revenue: 3200 },
  { name: "2024", profit: 1790, revenue: 4300 },
];

const growthData = [
  { name: "1-2", net_profit: 4000 },
  { name: "3-4", net_profit: 3000 },
  { name: " 5-6", net_profit: 2000 },
  { name: " 7-8", net_profit: 2780 },
  { name: " 9-10", net_profit: 1890 },
  { name: " 11-12", net_profit: 2390 },
];

const progressData = [
  { label: "add new lead", value: 106, max: 150, color: "bg-blue-500" },
  { label: "chnages in policy", value: 1379, max: 3000, color: "bg-green-500" },
  { label: "keep track manager", value: 328, max: 545, color: "bg-yellow-500" },
  { label: "visit office", value: 489, max: 800, color: "bg-red-500" },
];

const PieChartData = [
  { name: "Laptop", value: 1124, color: "#FF6384" },
  { name: "Mobile", value: 1667, color: "#36A2EB" },
  { name: "Pc", value: 953, color: "#FFCE56" },
  { name: "Tablet", value: 479, color: "#00f2fe" },
];

const averagePercentage = (
  progressData.reduce((acc, task) => acc + (task.value / task.max) * 100, 0) /
  progressData.length
).toFixed(2);

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/dashboard/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "admin") {
        router.replace("/dashboard/userdashboard");
        return;
      }
      setUser(parsedUser);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      router.replace("/dashboard/login");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-10 p-4 ">
      <div className="chart flex flex-col text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl">
        <h2 className="text-xl font-semibold text-center text-[var(--color-secondary)] py-2">
          Monthly Visitor{" "}
        </h2>
        <MonthlyUserChart />
      </div>

      <div className="cards flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-center text-[var(--color-secondary)] ">
          Details Cards
        </h2>
        <Card />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[59%_39%] xl:grid-cols-[59%_39%] gap-4 lg:gap-5 xl:gap-6 2xl:gap-8  ">
        {/* First Column (Stacked Lead Table & Profit Revenue Chart) */}
        <div className="flex flex-col gap-6">
          <div className="table-layout  text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] py-2">
              Lead Details{" "}
            </h2>
            <LeadTable />
          </div>
          <div className="text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl flex flex-col justify-center items-center  h-[600px]">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] py-2">
              Profit Revenue{" "}
            </h2>
            <ProfitRevenueChart
              data={profitRevenueData}
              barColors={{ profit: "#00f2fe", revenue: "#36a2eb" }}
            />
          </div>
        </div>

        {/* Second Column (Three Elements in One Row) */}
        <div className="grid grid-cols-1 gap-4">
          <div className="text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl justify-center flex flex-col items-center px-3">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] py-2">
              Task Overview
            </h2>
            <CircularProgress percentage={Number(averagePercentage)} />
            <MultiProgressBars progressData={progressData} />
          </div>
          <div className="text-[var(--primary-text)] bg-[var(--color-primary-foreground)]  rounded-xl flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] py-2">
              {" "}
              Selling Itmes
            </h2>
            <ChartPie data={PieChartData} />
          </div>
          <div className="text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl flex flex-col justify-center  items-center w-full">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] py-2">
              Company's Growth
            </h2>
            <GrowthChart
              data={growthData}
              strokeColor=" #00f2fe"
              fillColor=" #3896e7"
            />
          </div>
        </div>
      </div>

      <div className="table-layout text-[var(--primary-text)] bg-[var(--color-primary-foreground)] rounded-xl ">
        <h2 className="text-xl font-bold text-center text-[var(--color-secondary)] py-2">
          Users List
        </h2>
        <UserTable />
      </div>
    </div>
  );
};

export default page;
