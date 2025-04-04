"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
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
    setIsLoading(false); // Allow signup form to load
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
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const designation = formData.get("designation") as string;

    if (!email || !password || !name || !role || !designation) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role, designation }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = { email, name, designation, role };

        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage")); // Ensure React updates
        router.push("/dashboard/crm"); // Redirect after signup
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-fit m-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Enter Designation"
          className="p-2 border rounded"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="flex mt-4">
        <p>
          Already have an account?{" "}
          <Link href="/dashboard/login">
            <span className="text-blue-500 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
