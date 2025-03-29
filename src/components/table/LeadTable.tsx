"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Sun, Moon, ChevronUp, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const usersData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User" },
  { id: 5, name: "Edward Stark", email: "edward@example.com", role: "Manager" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User" },
  { id: 5, name: "Edward Stark", email: "edward@example.com", role: "Manager" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User" },
  
];

export default function LeadTable() {
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Handle Sorting
  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle Search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full  mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg h-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />

        <Button variant="outline" onClick={handleSort}>
          Sort by Name {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
        </Button>

        <Button
          variant="outline"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <TableHead className="p-3">ID</TableHead>
              <TableHead className="p-3">Name</TableHead>
              <TableHead className="p-3">Email</TableHead>
              <TableHead className="p-3">Role</TableHead>
              <TableHead className="p-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-gray-300 dark:border-gray-700">
                  <TableCell className="p-3">{user.id}</TableCell>
                  <TableCell className="p-3">{user.name}</TableCell>
                  <TableCell className="p-3">{user.email}</TableCell>
                  <TableCell className="p-3">{user.role}</TableCell>
                  <TableCell className="p-3 text-right">
                    {/* Dropdown Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => alert(`Viewing ${user.name}`)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Editing ${user.name}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Deleting ${user.name}`)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
