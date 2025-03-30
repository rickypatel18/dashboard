import Card from "@/components/card/Card";
import Chart1 from "@/components/charts/Chart1";
import ChartArea from "@/components/charts/GrowthChart";
import ChartPie from "@/components/charts/PieChart";
import ProfitRevenueChart from "@/components/charts/ProfitRevenueChart";
import CircularProgress from "@/components/CircularProgress";
import MultiProgressBars from "@/components/ProgressBar";
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
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const page = () => {
  return (
    <div className=" flex flex-col gap-20 border ">
      <div className="border-[0.5px] border-[#5f63692f]">
        <Chart1 />
      </div>
      <Card />

      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {/* Each grid item has a fixed height of 480px */}
        <div className="col-span-2 bg-gray-300 p-4 h-[480px]">
          <ProfitRevenueChart
            data={sampleData}
            barColors={{ pv: "#ff7300", uv: "#36a2eb" }}
          />
        </div>
        <div className="bg-gray-400 p-4 h-[480px] overflow-hidden">
          <ChartPie />
        </div>
        <div className="col-span-2 row-span-2 bg-gray-500 p-4 h-[960px]">
          <LeadTable />
        </div>
        <div className="bg-gray-500 p-4 h-[480px]">
          {" "}
          <div className="flex flex-col items-center space-y-4 p-8 bg-gray-900 min-h-screen">
            <h2 className="text-xl font-bold text-white">User Growth</h2>
            <CircularProgress percentage={35} />
            <MultiProgressBars />
          </div>
        </div>
        <div className="bg-gray-500 p-4 h-[480px]">
          <ChartArea
            data={sampleData2}
            strokeColor="#00c49f"
            fillColor="#00c49f"
          />
        </div>
      </div>

      <UserTable />
    </div>
  );
};

export default page;
