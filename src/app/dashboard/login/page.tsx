"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user exists and redirect
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const redirectPath =
          user.role === "admin" ? "/dashboard/crm" : "/dashboard/userdashboard";
        router.replace(redirectPath);
        return; // Prevent form rendering this page data
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;

    if (!email || !role || !password) {
      setError("Please enter email, role, and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage"));

        const redirectPath =
          data.user.role === "admin"
            ? "/dashboard/crm"
            : "/dashboard/userdashboard";
        router.replace(redirectPath);
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-fit m-auto p-4 bg-[var(--color-primary-foreground)] rounded-xl">
      <h2 className="text-xl font-semibold text-center text-[var(--color-secondary)] mb-4">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto"
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="flex flex-col gap-2 mt-4 text-center">
        <p>
          Don't have an account yet?{" "}
          <Link
            href="/dashboard/signup"
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
