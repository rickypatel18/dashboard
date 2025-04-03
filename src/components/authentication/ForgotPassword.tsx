"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok && data.resetLink) {
      console.log("Reset Link:", data.resetLink);
      setResetLink(data.resetLink);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      {message && <p className="mb-3">{message}</p>}
      <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded">
          Send Reset Link
        </button>
      </form>

      {resetLink && (
        <div className="mt-4 text-center">
          <p className="text-green-500">Reset link:</p>
          <a href={resetLink} className="text-blue-400 underline">
            {resetLink}
          </a>
        </div>
      )}
    </div>
  );
}
