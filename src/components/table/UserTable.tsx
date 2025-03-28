"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  amount: string;
  status: string;
  location: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView();

  const fetchUsers = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users?page=${page}`);
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.users]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  }, [loading, page]);

  useEffect(() => {
    if (inView) fetchUsers();
  }, [inView, fetchUsers]);

  return (
    <Card className="w-full max-w-full mx-auto p-4 rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Users List
      </h2>

      <div className="overflow-hidden border rounded-lg">
        <div className="overflow-y-auto max-h-[700px]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b ${
                    resolvedTheme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.amount}</td>
                  <td
                    className={`px-4 py-2 ${
                      user.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-4 py-2">{user.location}</td>
                  <td className="px-4 py-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Infinite Scroll Loader */}
          <div ref={ref} className="h-10" />
          {loading && (
            <div className="flex justify-center py-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full mx-2" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
