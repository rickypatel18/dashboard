"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Bolt, CircleUser, Inbox, LogOut, UserRoundX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    designation: string;
    email: string;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Load user from localStorage safely
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser || storedUser === "undefined") {
          setUser(null);
          return;
        }

        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user data:", error);
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Generic function to handle menu actions
  function handleMenuAction(action: () => void) {
    setIsOpen(false);
    action();
  }

  // Logout function
  function handleLogout() {
    handleMenuAction(() => {
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      router.replace("/dashboard/login");
      setUser(null);
    });
  }

  // Delete account function
  async function handleDeleteAccount() {
    if (!user?.email) {
      alert("User email is missing. Cannot delete account.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    handleMenuAction(async () => {
      try {
        const response = await fetch("/api/auth/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Account deletion failed");

        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        router.replace("/dashboard/signup");
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Avatar & Name */}
      {user ? (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex gap-1 items-center cursor-pointer"
        >
          <Avatar className="w-9 h-9 lg:w-10 lg:h-10">
            <Image
              src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-full bg-contain w-20"
              priority
            />
          </Avatar>
          <div className="hidden lg:flex lg:flex-col items-start p-2 max-w-[100px]">
            <p className="text-sm text-start truncate w-full">{user.name}</p>
            <p className="text-xs text-start truncate w-full">
              {user.designation}
            </p>
          </div>
        </button>
      ) : (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => router.replace("/dashboard/login")}
        >
          Login
        </Button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-[#1a1919] text-white rounded-md z-50 overflow-hidden transition-all duration-300">
          <ul className="py-2 flex flex-col">
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-purple-600/50 transition rounded-md"
              onClick={() => handleMenuAction(() => router.replace("/profile"))}
            >
              <CircleUser className="w-5 h-5 text-purple-500" />
              <p className="text-sm">Profile</p>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-600/50 transition rounded-md"
              onClick={() =>
                handleMenuAction(() => router.replace("/settings"))
              }
            >
              <Bolt className="w-5 h-5 text-gray-400" />
              <p className="text-sm">Settings</p>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-green-600/50 transition rounded-md"
              onClick={() => handleMenuAction(() => router.replace("/inbox"))}
            >
              <Inbox className="w-5 h-5 text-green-500" />
              <p className="text-sm flex-1">Inbox</p>
              <div className="flex">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
              </div>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-yellow-600/50 transition rounded-md"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-yellow-400" />
              <p className="text-sm">Logout</p>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-red-600/50 transition rounded-md"
              onClick={handleDeleteAccount}
            >
              <UserRoundX className="w-5 h-5 text-red-400" />
              <p className="text-sm">{user ? "Delete Account" : "Login"}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
