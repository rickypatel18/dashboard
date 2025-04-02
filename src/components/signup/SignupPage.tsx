"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    // FormData is provided by the browser and allows you to easily access form data in a structured way
    //it contains key-value pairs of form data, where the keys are the names of the form fields and the values are the values entered by the user.
    // {
    // "email": "user@example.com",
    // "password": "mypassword"
    // }

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/dashboard/ecommerce"); // Redirect to login page
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto"
    >
      <input
        // type="email"
        type="text"
        // required
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
        className="bg-green-500 text-white p-2 rounded"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
