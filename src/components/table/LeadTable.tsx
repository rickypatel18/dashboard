"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const usersData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Lead" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Lead" },
  { id: 5, name: "Edward Stark", email: "edward@example.com", role: "Manager" },
  { id: 6, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 7, name: "Charlie Brown", email: "charlie@example.com", role: "Lead" },
  { id: 8, name: "Diana Prince", email: "diana@example.com", role: "Lead" },
  { id: 9, name: "Edward Stark", email: "edward@example.com", role: "Manager" },
  { id: 10, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 11, name: "Charlie Brown", email: "charlie@example.com", role: "Lead" },
  { id: 12, name: "Diana Prince", email: "diana@example.com", role: "Lead" },
  { id: 13, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 14, name: "Charlie Brown", email: "charlie@example.com", role: "Lead" },
  { id: 15, name: "Diana Prince", email: "diana@example.com", role: "Lead" },
];

export default function LeadTable() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Handle Sorting
  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle Search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full  mx-auto p-4 flex flex-col gap-5 rounded-xl h-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 lg:w-1/3 rounded-lg p-2 border border-gray-300 bg-white text-gray-900 focus:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100  focus:outline-none focus:ring-0 focus:border-transparent transition-colors"
        />

        <Button
          variant="secondary"
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent transition-colors"
          onClick={handleSort}
        >
          Sort by Name {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {/* Table */}
      <div className="border-[0.5px] border-[#5f636950] rounded-xl overflow-hidden">
        <div className="max-h-[600px] overflow-auto scrollbar-hide">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-800 dark:bg-gray-200">
              <tr>
                <th className="p-3 text-gray-200 dark:text-gray-800">ID</th>
                <th className="p-3 text-gray-200 dark:text-gray-800">Name</th>
                <th className="p-3 text-gray-200 dark:text-gray-800">Email</th>
                <th className="p-3 text-gray-200 dark:text-gray-800">Role</th>
                <th className="p-3 text-gray-200 dark:text-gray-800 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 dark:border-gray-700"
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 text-gray-200 dark:bg-gray-800 dark:text-gray-200">
                          <DropdownMenuItem
                            onClick={() => alert(`Viewing ${user.name}`)}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Editing ${user.name}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => alert(`Deleting ${user.name}`)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
