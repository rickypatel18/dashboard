"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Bolt, CircleUser, Inbox, LogOut } from "lucide-react";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Avatar & Name (Click to Toggle) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex gap-2 items-center cursor-pointer"
      >
        <Avatar className="w-10 h-10">
          <Image
            src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
            alt="@shadcn"
            width={50}
            height={50}
            className="rounded-full bg-contain"
            // onError={(e) => (e.currentTarget.src = "/fallback-avatar.png")}  local image of user
            priority
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0">
          <p className="text-sm">Tailor</p>
          <p className="text-xs">Designer</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-[#1a1919] text-white rounded-lg z-50 overflow-hidden transition-all duration-300">
          <ul className="py-2 flex flex-col">
            <li className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-700 transition rounded-lg">
              <CircleUser className="w-5 h-5 text-purple-500" />
              <p className="text-sm">Profile</p>
            </li>
            <li className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-700 transition rounded-lg">
              <Bolt className="w-5 h-5 text-yellow-400" />
              <p className="text-sm">Settings</p>
            </li>
            <li className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-700 transition rounded-lg">
              <Inbox className="w-5 h-5 text-green-500" />
              <p className="text-sm flex-1">Inbox</p>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-300 cursor-pointer" />
                {/* Notification Badge */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </div>
            </li>
            <li className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-red-600 transition rounded-lg">
              <LogOut className="w-5 h-5 text-red-400" />
              <p className="text-sm">Logout</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
