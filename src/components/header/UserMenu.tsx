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

  // Load user from localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Function to handle menu actions and close the menu
  function handleMenuAction(action: () => void) {
    setIsOpen(false); // Close the menu
    setTimeout(action, 150); // Execute the action after a short delay for smooth UI transition
  }

  // Logout function
  function handleLogout() {
    handleMenuAction(() => {
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      setUser(null);
      router.push("/dashboard/login");
    });
  }

  // Delete account function
  async function handleDeleteAccount() {
    if (!user || !user.email) {
      alert("User email is missing. Cannot delete account.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    handleMenuAction(async () => {
      try {
        const response = await fetch("/api/auth/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("storage"));
          router.push("/dashboard/signup");
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Avatar & Name */}
      {user ? (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex gap-2 items-center cursor-pointer"
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
          <div className="hidden lg:flex lg:flex-col items-start">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs">{user.designation}</p>
          </div>
        </button>
      ) : (
        <Button
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/login")}
        >
          Login
        </Button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-[#1a1919] text-white rounded-xl z-50 overflow-hidden transition-all duration-300">
          <ul className="py-2 flex flex-col">
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-700 transition rounded-xl"
              onClick={() => handleMenuAction(() => router.push("/profile"))}
            >
              <CircleUser className="w-5 h-5 text-purple-500" />
              <p className="text-sm">Profile</p>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-700 transition rounded-xl"
              onClick={() => handleMenuAction(() => router.push("/settings"))}
            >
              <Bolt className="w-5 h-5 text-yellow-400" />
              <p className="text-sm">Settings</p>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-700 transition rounded-xl"
              onClick={() => handleMenuAction(() => router.push("/inbox"))}
            >
              <Inbox className="w-5 h-5 text-green-500" />
              <p className="text-sm flex-1">Inbox</p>
              <div className="flex">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
              </div>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-red-600 transition rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <p className="text-sm">Logout</p>
            </li>
            <li
              className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-red-600 transition rounded-xl"
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
