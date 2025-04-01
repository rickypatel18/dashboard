import Card from "@/components/card/Card";
import MonthlyUserChart from "@/components/charts/MonthlyUserChart";
import GrowthChart from "@/components/charts/GrowthChart";
import ChartPie from "@/components/charts/PieChart";
import ProfitRevenueChart from "@/components/charts/ProfitRevenueChart";
import CircularProgress from "@/components/charts/CircularProgress";
import MultiProgressBars from "@/components/charts/ProgressBar";
import LeadTable from "@/components/table/LeadTable";
import UserTable from "@/components/table/UserTable";
import React from "react";

const sampleData = [
  { name: "2020", uv: 1000, pv: 7800, amt: 2290 },
  { name: "2021", uv: 1280, pv: 3908, amt: 2000 },
  { name: "2022", uv: 1490, pv: 4800, amt: 2181 },
  { name: "2023", uv: 1190, pv: 3800, amt: 2500 },
  { name: "2024", uv: 1790, pv: 4300, amt: 2100 },
];

const sampleData2 = [
  { name: "1-2", uv: 4000, pv: 2400, amt: 2400 },
  { name: "3-4", uv: 3000, pv: 1398, amt: 2210 },
  { name: " 5-6", uv: 2000, pv: 9800, amt: 2290 },
  { name: " 7-8", uv: 2780, pv: 3908, amt: 2000 },
  { name: " 9-10", uv: 1890, pv: 4800, amt: 2181 },
  { name: " 11-12", uv: 2390, pv: 3800, amt: 2500 },
];

const progressData = [
  { label: "Task 1", value: 110, max: 150, color: "bg-blue-500" },
  { label: "Task 2", value: 1379, max: 3000, color: "bg-green-500" },
  { label: "Task 3", value: 428, max: 545, color: "bg-yellow-500" },
  { label: "Task 4", value: 589, max: 800, color: "bg-red-500" },
];

const PieChartData = [
  { name: "Laptop", value: 1624, color: "#FF6384" },
  { name: "Mobile", value: 1267, color: "#36A2EB" },
  { name: "Pc", value: 1153, color: "#FFCE56" },
  { name: "Tablet", value: 679, color: "#4BC0C0" },
];

const averagePercentage = (
  progressData.reduce((acc, task) => acc + (task.value / task.max) * 100, 0) /
  progressData.length
).toFixed(2);

const page = () => {
  return (
    <div className="flex flex-col gap-10 p-4 ">
      <div className="chart">
        <MonthlyUserChart />
      </div>

      <div className="cards">
        <Card />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[59%_39%] xl:grid-cols-[59%_39%] lg:gap-5 xl:gap-6 2xl:gap-8  ">
        {/* First Column (Stacked Lead Table & Profit Revenue Chart) */}
        <div className="flex flex-col gap-6">
          <div className="table-layout bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl flex justify-center items-center">
            <LeadTable />
          </div>
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl flex flex-col justify-center items-center py-5 h-[600px]">
            <h2 className="text-xl font-semibold dark:text-white">
              Profit revenue{" "}
            </h2>
            <ProfitRevenueChart
              data={sampleData}
              barColors={{ uv: "#00f2fe", pv: "#36a2eb" }}
            />
          </div>
        </div>

        {/* Second Column (Three Elements in One Row) */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl justify-center flex flex-col items-center py-5 px-3">
            <h2 className="text-xl font-semibold ">User Growth</h2>
            <CircularProgress percentage={Number(averagePercentage)} />
            <MultiProgressBars progressData={progressData} />
          </div>
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] py-5 rounded-xl flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold"> Pie chart</h2>
            <ChartPie data={PieChartData} />
          </div>
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl flex flex-col justify-center py-5 items-center w-full">
            <h2 className="text-xl font-semibold ">Area chart</h2>
            <GrowthChart
              data={sampleData2}
              strokeColor=" #00f2fe"
              fillColor=" #3896e7"
            />
          </div>
        </div>
      </div>

      <div className="table-layout bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl ">
        <UserTable />
      </div>
    </div>
  );
};

export default page;
