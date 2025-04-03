"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store user data in localStorage (without password)
        localStorage.setItem("user", JSON.stringify(data.user));

        // Trigger storage event for UserMenu update
        window.dispatchEvent(new Event("storage"));

        router.push("/dashboard/crm"); // Redirect after login
      } else {
        const data = await response.json();
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-fit m-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto"
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded"
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
      <div className="flex flex-col gap-2">
        <p>
          Don't have an account yet?{" "}
          <Link href="/dashboard/signup">
            <span className="text-blue-500 cursor-pointer hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
        <p>
          Forgot Password?{" "}
          <Link href="/dashboard/forgotpassword">
            <span className="text-blue-500 cursor-pointer hover:underline">
              Reset Password
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
