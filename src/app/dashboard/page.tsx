"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/dashboard/crm"); 
    }
  }, []);
  return (
    <div className="min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] ">
      <p>
        please login to see dashboard{" "}
        <Link href="/dashboard/login">
          <span className="text-blue-500 cursor-pointer hover:underline">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
};

export default page;
