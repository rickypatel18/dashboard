"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  amount: number;
  status: string;
  location: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    minAmount: "",
    maxAmount: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users`);
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    let filtered = users;
    if (filters.search.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((user) => user.status === filters.status);
    }
    const minAmount = parseFloat(filters.minAmount) || 0;
    const maxAmount = parseFloat(filters.maxAmount) || Infinity;
    filtered = filtered.filter(
      (user) => user.amount >= minAmount && user.amount <= maxAmount
    );
    return filtered;
  }, [filters, users]);

  return (
    <Card className="w-full mx-auto p-4 border-none flex flex-col gap-5 rounded-xl">
      <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
        <div className="flex gap-2 w-full justify-between items-center">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="w-1/2 lg:w-1/3 rounded-lg p-2 border-[0.5px] border-[#5f636950] focus:bg-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 focus:outline-none transition-colors"
          />

          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger className="w-1/2 lg:w-1/3 rounded-lg p-2 text-gray-900 bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 focus:outline-none transition-colors">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full justify-between items-center">
          <input
            type="number"
            placeholder="Min Amount"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minAmount: e.target.value }))
            }
            className="w-1/2 lg:w-1/3 rounded-lg p-2 border border-gray-300 text-gray-900 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 focus:outline-none transition-colors"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxAmount: e.target.value }))
            }
            className="w-1/2 lg:w-1/3 rounded-lg p-2 border border-gray-300 text-gray-900 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="text-center text-lg font-medium text-gray-500 py-6">
          Loading...
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-500 py-6">
          No users found.
        </div>
      ) : (
        <div className="overflow-hidden border-[0.5px] border-[#5f636950] rounded-xl">
          {/* Scrollable Table Container */}
          <div className="max-h-[500px] overflow-auto scrollbar-hide relative">
            <table className="w-full border-collapse">
              {/* Sticky Table Header */}
              <thead className="sticky top-0 z-10 bg-gray-800 dark:bg-gray-200">
                <tr className="text-left">
                  <th className="p-3 text-gray-200 dark:text-gray-800">ID</th>
                  <th className="p-3 text-gray-200 dark:text-gray-800">Name</th>
                  <th className="p-3 text-gray-200 dark:text-gray-800">
                    Email
                  </th>
                  <th className="p-3 text-gray-200 dark:text-gray-800">
                    Amount
                  </th>
                  <th className="p-3 text-gray-200 dark:text-gray-800">
                    Status
                  </th>
                  <th className="p-3 text-gray-200 dark:text-gray-800">
                    Location
                  </th>
                  <th className="p-3 text-gray-200 dark:text-gray-800 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className=" border-b-[0.5px] border-[#5f636950]"
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">$ {user.amount}</td>
                    <td
                      className={`p-3 text-left ${
                        user.status === "Done"
                          ? "text-green-500"
                          : "text-red-500"
                      } text-center`}
                    >
                      {user.status}
                    </td>
                    <td className="p-3">{user.location}</td>
                    <td className="p-3 text-right">
                      <button className="bg-gray-800 text-gray-200 hover:bg-gray-200 hover:text-gray-800 p-2 rounded-md">
                        <Eye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
