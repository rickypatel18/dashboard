"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  NotebookText,
  ChevronDown,
  ChevronRight,
  ShieldUser,
  NotebookTabs,
  Wrench,
  BookOpenCheck,
  PhoneOutgoing,
} from "lucide-react";
import { Avatar } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";

const menu = [
  {
    menu: "Dashboard",
    icon: <LayoutDashboard />,
    submenu: [{ value: "CRM" }, { value: "E-Commerce" }, { value: "Sales" }],
  },
  {
    menu: "Pages",
    icon: <NotebookText />,
    submenu: [{ value: "Landing" }, { value: "Pricing" }, { value: "Jobs" }],
  },
];

const Sidebar = ({
  isExpanded,
  toggleSidebar,
  isManuallyExpanded,
}: {
  isExpanded: boolean;
  toggleSidebar: () => void;
  isManuallyExpanded: boolean;
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>("Dashboard");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 flex flex-col justify-between h-screen bg-[#110f0f] text-white z-50 transition-all duration-100 ${
        isExpanded || isHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => {
        if (!isManuallyExpanded) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isManuallyExpanded) setIsHovered(false);
      }}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex justify-center items-center gap-2 border-b">
        <img src="/logo.svg" alt="Logo" width={30} height={30} />
        {(isExpanded || isHovered) && <div className="text-2xl pb-2">gnext</div>}
      </div>

      {/* Sidebar Menu */}
      <div className="p-4 flex-1">
        {menu.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              className={`w-full flex items-center p-3 rounded-md justify-between hover:bg-blue-200/10 ${
                openMenu === item.menu ? "bg-blue-200/5" : ""
              }`}
              onClick={() => setOpenMenu((prev) => (prev === item.menu ? null : item.menu))}
            >
              <div className="flex items-center gap-3">
                <div>{item.icon}</div>
                {(isExpanded || isHovered) && <span>{item.menu}</span>}
              </div>
              {(isExpanded || isHovered) && (
                <div>{openMenu === item.menu ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</div>
              )}
            </button>

            {(isExpanded || isHovered) && openMenu === item.menu && (
              <ul className="pl-6 mt-2 space-y-1">
                {item.submenu.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link href={`/${item.menu.toLowerCase()}/${sub.value.toLowerCase().replace(/[- ]/g, "")}`}>
                      <span className="block w-full p-2 rounded-md cursor-pointer hover:bg-blue-200/10">
                        {sub.value}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Avatar Section - Only Show When Sidebar is Expanded */}
      {(isExpanded || isHovered) && (
        <div className="flex justify-center items-center p-5 border-t">
          <button className="flex gap-2 items-center cursor-pointer">
            <Avatar>
              <Image
                src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
                alt="@shadcn"
                width={40}
                height={40}
                className="rounded-full object-cover w-11 h-11"
                priority
              />
            </Avatar>
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm">Tailor</p>
              <p className="text-xs text-gray-400">Designer</p>
            </div>
          </button>
          <Button variant="outline" className="text-sm">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
