"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const redirectPath =
          user.role === "admin" ? "/dashboard/crm" : "/dashboard/userdashboard";
        router.replace(redirectPath);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        router.replace("/dashboard");
      }
    } else {
      router.replace("/dashboard");
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return null;
}
