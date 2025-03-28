"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  NotebookText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const menu = [
  {
    menu: "Dashboard",
    icon: <LayoutDashboard />,
    submenu: [
      { value: "CRM" },
      { value: "E-Commerce" },
      { value: "Sales" },
      {
        value: "Crypto",
        submenu: [
          { value: "Bitcoin" },
          { value: "Ethereum" },
          { value: "NFTs" },
        ],
      },
      {
        value: "Stocks",
        submenu: [{ value: "MRF" }, { value: "Tata" }, { value: "Adani" }],
      },
      { value: "Courses" },
    ],
  },
  {
    menu: "Pages",
    icon: <NotebookText />,
    submenu: [
      { value: "Landing" },
      { value: "Pricing" },
      { value: "Jobs" },
      { value: "Blogs" },
    ],
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
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleToggle = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleSubmenuToggle = (submenuName: string) => {
    setOpenSubmenu((prev) => (prev === submenuName ? null : submenuName));
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-[#110f0f] text-white  z-30 transition-all duration-300 ${
        isExpanded || isHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => {
        if (!isManuallyExpanded) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isManuallyExpanded) setIsHovered(false);
      }}
    >
      <div className="border-[0.5px] border-[#5f636950] h-16 flex justify-center items-center">
        <img src="/logo.svg" alt="Logo" width={40} height={40} />
      </div>

      <div className="p-4">
        {menu.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              className="text-white w-full hover:bg-blue-200/10 flex items-center p-3 rounded-md justify-center"
              onClick={() => handleToggle(item.menu)}
            >
              <div className="flex items-center gap-3">
                <div>{item.icon}</div>
                {(isExpanded || isHovered) && <span>{item.menu}</span>}
              </div>

              {(isExpanded || isHovered) && (
                <div className="ml-auto">
                  {openMenu === item.menu ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              )}
            </button>

            {(isExpanded || isHovered) && openMenu === item.menu && (
              <ul className="pl-6 mt-2 space-y-1 ">
                {item.submenu.map((sub, subIndex) => (
                  <li key={subIndex}>
                    {sub.submenu ? (
                      <>
                        <button
                          className=" w-full flex items-center justify-between p-2 hover:bg-blue-200/10 rounded-md "
                          onClick={() => handleSubmenuToggle(sub.value)}
                        >
                          <span>{sub.value}</span>
                          {openSubmenu === sub.value ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>

                        {openSubmenu === sub.value && (
                          <ul className="pl-4 mt-1 space-y-1    ">
                            {sub.submenu.map((nested, nestedIndex) => (
                              <li
                                key={nestedIndex}
                                className="w-full hover:bg-blue-200/10 flex items-center p-2 rounded-md "
                              >
                                <Link
                                  href={`/${nested.value
                                    .toLowerCase()
                                    .replace(/ /g, "-")}`}
                                >
                                  <div className=" ">{nested.value}</div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={`/${sub.value.toLowerCase().replace(/ /g, "-")}`}
                      >
                        <div className="w-full hover:bg-blue-200/10 flex items-center p-2 rounded-md">
                          {sub.value}
                        </div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
