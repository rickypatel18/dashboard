import { MoveRight, Users } from "lucide-react";
import React from "react";
import TinyChart from "../charts/TinyChart";

const data = [
  { name: "Page A", pv: 5400, amt: 2400 },
  { name: "Page B", pv: 4398, amt: 2210 },
  { name: "Page C", pv: 2400, amt: 2290 },
  { name: "Page D", pv: 4908, amt: 2000 },
  { name: "Page E", pv: 4800, amt: 2181 },
  { name: "Page F", pv: 3800, amt: 2500 },
  { name: "Page G", pv: 4300, amt: 2100 },
  { name: "Page D", pv: 4908, amt: 2000 },
  { name: "Page G", pv: 4300, amt: 2100 },
];

const Card = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-20 ">
      <div className="flex justify-between items-center bg-blue-950/30 p-5 rounded-lg opacity-80">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-amber-200 flex w-fit h-fit">
            <Users />
          </div>
          <div className="flex flex-col  items-start gap-5 justify-center">
            <div>
              <p className="text-md">Total Customers</p>
              <p className="text-2xl">1,02,890</p>
            </div>
            <button className="flex justify-center items-center gap-2">
              <p>View all</p>
              <MoveRight className="w-4 " />
            </button>
          </div>
        </div>
        <div className="">
          <TinyChart data={data} dataKey="pv" color="#8884d8" />
          <div>
            <p>+40% </p>
            <p className="text-sm">this month</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-blue-950/30 p-5 rounded-lg opacity-80">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-amber-200 flex w-fit h-fit">
            <Users />
          </div>
          <div className="flex flex-col  items-start gap-5 justify-center">
            <div>
              <p className="text-md">Total Customers</p>
              <p className="text-2xl">1,02,890</p>
            </div>
            <button className="flex justify-center items-center gap-2">
              <p>View all</p>
              <MoveRight className="w-4 " />
            </button>
          </div>
        </div>
        <div className="">
          <TinyChart data={data} dataKey="pv" color="#8884d8" />
          <div>
            <p>+40% </p>
            <p className="text-sm">this month</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-blue-950/30 p-5 rounded-lg opacity-80">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-amber-200 flex w-fit h-fit">
            <Users />
          </div>
          <div className="flex flex-col  items-start gap-5 justify-center">
            <div>
              <p className="text-md">Total Customers</p>
              <p className="text-2xl">1,02,890</p>
            </div>
            <button className="flex justify-center items-center gap-2">
              <p>View all</p>
              <MoveRight className="w-4 " />
            </button>
          </div>
        </div>
        <div className="">
          <TinyChart data={data} dataKey="pv" color="#8884d8" />
          <div>
            <p>+40% </p>
            <p className="text-sm">this month</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-blue-950/30 p-5 rounded-lg opacity-80">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-amber-200 flex w-fit h-fit">
            <Users />
          </div>
          <div className="flex flex-col  items-start gap-5 justify-center">
            <div>
              <p className="text-md">Total Customers</p>
              <p className="text-2xl">1,02,890</p>
            </div>
            <button className="flex justify-center items-center gap-2">
              <p>View all</p>
              <MoveRight className="w-4 " />
            </button>
          </div>
        </div>
        <div className="">
          <TinyChart data={data} dataKey="pv" color="#8884d8" />
          <div>
            <p>+40% </p>
            <p className="text-sm">this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
