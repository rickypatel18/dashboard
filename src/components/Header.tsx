"use client";
import {
  Bell,
  Globe,
  Maximize,
  Menu,
  Search,
  Settings,
  SunMoon,
  X,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectDemo } from "./SelectDemo";
import { ThemeToggle } from "./ThemeToggle";

const Header = ({
  isSidebarExpanded,
  toggleSidebar,
}: {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      {/* Search Drawer */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-[#1a1919] transition-all duration-300 overflow-hidden flex items-start justify-center z-20 ${
          isSearchOpen ? "h-[30vh] opacity-100" : "h-0 opacity-0"
        }`}
        ref={searchBoxRef}
      >
        {isSearchOpen && (
          <div className="flex flex-col w-full py-10 px-20 gap-4">
            <div className="flex justify-end">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-white"
              >
                <X />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">
                What are you looking for?
              </h2>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search..." className="flex-1" />
              <Button variant="outline" className="text-black">
                Search
              </Button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 transition-all duration-300 bg-[#110f0f] h-16 flex items-center justify-between pl-5 pr-10 border-b border-[#5f636950] z-10 ${
          isSidebarExpanded
            ? "left-64 w-[calc(100%-16rem)]"
            : "left-20 w-[calc(100%-5rem)]"
        }`}
      >
        <button onClick={toggleSidebar} className="bg-transparent text-white">
          {isSidebarExpanded ? <X /> : <Menu />}
        </button>
        <div className="flex gap-10 items-center justify-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative flex items-center gap-1 p-2 bg-gray-800 rounded-full cursor-pointer w-fit border border-gray-700"
          >
            <Search />
          </button>
          <SelectDemo />
          <ThemeToggle />
          <div className="relative flex items-center gap-1 p-2 bg-gray-800 rounded-full cursor-pointer w-fit border border-gray-700">
            <Bell />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm">Tailor</p>
              <p className="text-xs">Designer</p>
            </div>
          </div>
          <div className="relative flex items-center gap-1 p-2 bg-gray-800 rounded-full cursor-pointer w-fit border border-gray-700">
            <Maximize />
          </div>
          <div className="relative flex items-center gap-1 p-2 bg-gray-800 rounded-full cursor-pointer w-fit border border-gray-700">
            <Settings />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
