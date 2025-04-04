"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
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
      if (parsedUser.role === "admin") {
        router.replace("/dashboard/crm");
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
    <div className="p-4">
      <h2 className="text-xl font-bold">User Dashboard</h2>
      <p>Welcome, {user.name}! You do not have admin privileges.</p>
    </div>
  );
};

export default UserDashboard;
