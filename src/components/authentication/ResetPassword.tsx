"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/resetpassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setTimeout(() => router.push("/login"), 2000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Reset Your Password</h2>
      {message && <p className="mb-3">{message}</p>}
      <form onSubmit={handleResetPassword} className="flex flex-col space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
