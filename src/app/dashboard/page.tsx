"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");  
    if (!storedUser) {
      setIsChecking(false);
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const redirectPath =
        user.role === "admin"
          ? "/dashboard/crm"
          : "/dashboard/userdashboard";
      router.replace(redirectPath);
      return; // Stops further execution to prevent flickering
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] flex items-center justify-center">
      <p>
        Please login to see the dashboard{" "}
        <Link href="/dashboard/login">
          <span className="text-blue-500 cursor-pointer hover:underline">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Page;
