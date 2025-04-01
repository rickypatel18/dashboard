"use client";
import {
  Bell,
  Maximize,
  Menu,
  Minimize,
  Search,
  Settings,
  X,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { ChangeLanguage } from "./ChangeLanguage";
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Handle fullscreen toggle
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes (handles `Esc` key exit)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      {/* Search Drawer */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-fit max-w-2xl bg-[#1a1919] transition-all duration-500 overflow-hidden flex items-start justify-center z-20 ${
          isSearchOpen ? "h-[30vh] opacity-100" : "h-0 opacity-0"
        }`}
        ref={searchBoxRef}
      >
        {isSearchOpen && (
          <div className="flex flex-col w-full py-10 px-10 lg:py-15 lg:px-20 gap-4">
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
              <Button variant="outline" className="dark:text-white">
                Search
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Header */}
      <div
        className={`fixed px-4 border-[0.5px] border-[#f5e9e9] dark:border-[0.5px] dark:border-[#5f636950] top-0 transition-all duration-100 bg-[#fff] dark:bg-[#110f0f] h-14 lg:h-16 flex items-center justify-between left-0 lg:left-20 w-full z-10 ${
          isSidebarExpanded
            ? "lg:left-64 lg:w-[calc(100%-16rem)]"
            : "lg:left-20 lg:w-[calc(100%-5rem)]"
        }`}
      >
        <div className="flex flex-row gap-2">
          {!isSidebarExpanded ? (
            <div className="flex w-fit h-8 lg:hidden">
              <img src="/logo.svg" alt="Logo" width={30} height={30} />
            </div>  
          ) : (
            <div className="flex flex-row">
              <div className="flex lg:hidden">
                <img src="/logo.svg" alt="Logo" width={30} height={30} />
                <div className="text-2xl pb-2">gnext</div>
              </div>
            </div>
          )}

          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="bg-transparent dark:text-white"
          >
            {isSidebarExpanded ? <X /> : <Menu />}
          </button>
        </div>

        <div className="flex gap-3 lg:gap-10 items-center justify-center">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative flex items-center justify-center cursor-pointer w-fit"
          >
            <Search className="w-5 lg:w-7 dark:text-white " />
          </button>

          {/* Select Dropdown */}
          <div className="relative flex items-center justify-center cursor-pointer w-fit">
            <ChangeLanguage />
          </div>

          {/* Theme Toggle */}
          <div className="relative flex items-center justify-center cursor-pointer w-fit">
            <ThemeToggle />
          </div>

          {/* Notifications and Settings */}
          <div className="relative hidden  lg:flex items-center justify-center cursor-pointer w-fit">
            <Bell />
          </div>

          {/* userProfile  */}
          <div className="relative flex items-center justify-center cursor-pointer w-fit ">
            <UserMenu />
          </div>

          {/* Maximize Icon  */}
          <div
            className="relative hidden lg:flex items-center justify-center cursor-pointer w-fit"
            onClick={handleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="w-5 lg:w-7  hover:opacity-80 transition-all" />
            ) : (
              <Maximize className="w-5 lg:w-7  hover:opacity-80 transition-all" />
            )}
          </div>

          {/* Settings Icon  */}
          <div className="relative flex items-center justify-center cursor-pointer w-fit">
            <Settings className="w-5 lg:w-7 animate-[spin_3s_linear_infinite]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
