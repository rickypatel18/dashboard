"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
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

const menu = [
  {
    menu: "Dashboard",
    icon: <LayoutDashboard />,
    submenu: [
      { value: "CRM" },
      { value: "Login" },
      { value: "Sign Up" },
      { value: "Logins" },
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
  {
    menu: "Task",
    icon: <NotebookTabs />,
    submenu: [
      { value: "Board" },
      { value: "Listview" },
      {
        value: "Task Detail",
        submenu: [
          { value: "Daily" },
          { value: "Today" },
          { value: "Datewise" },
        ],
      },
      { value: "Courses" },
    ],
  },
  {
    menu: "Authentication",
    icon: <ShieldUser />,
    submenu: [
      { value: "Sign Up" },
      { value: "Sign In" },
      { value: "Two Step Verification" },
      { value: "Reset Password" },
    ],
  },
  {
    menu: "Tools",
    icon: <Wrench />,
    submenu: [
      { value: "Sign Up" },
      { value: "Sign In" },
      { value: "Two Step Verification" },
      { value: "Reset Password" },
    ],
  },
  {
    menu: "Invoice",
    icon: <BookOpenCheck />,
    submenu: [
      { value: "Sign Up" },
      { value: "Sign In" },
      { value: "Two Step Verification" },
      { value: "Reset Password" },
    ],
  },
  {
    menu: "Conatact Us",
    icon: <PhoneOutgoing />,
    submenu: [
      { value: "Sign Up" },
      { value: "Sign In" },
      { value: "Two Step Verification" },
      { value: "Reset Password" },
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
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>("Dashboard");
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const getActiveItem = () => {
    const segments = pathname.split("/").filter(Boolean);
    const currentPath = segments[segments.length - 1]
      ?.toLowerCase()
      .replace(/[- ]/g, "");

    for (const menuItem of menu) {
      for (const submenuItem of menuItem.submenu) {
        const normalizedValue = submenuItem.value
          .toLowerCase()
          .replace(/[- ]/g, "");

        if (normalizedValue === currentPath) return submenuItem.value;

        if ("submenu" in submenuItem) {
          const nestedSubmenu = submenuItem.submenu as Array<{ value: string }>;
          for (const nestedItem of nestedSubmenu) {
            if (
              nestedItem.value.toLowerCase().replace(/[- ]/g, "") ===
              currentPath
            ) {
              return nestedItem.value;
            }
          }
        }
      }
    }
    return segments.length <= 1 ? "CRM" : "";
  };

  const [activeItem, setActiveItem] = useState<string>(getActiveItem());

  useEffect(() => {
    const newActiveItem = getActiveItem();
    setActiveItem(newActiveItem);

    menu.forEach((menuItem) => {
      const hasActiveSubmenu = menuItem.submenu.some((submenuItem) => {
        if ("submenu" in submenuItem) {
          return submenuItem.submenu?.some(
            (nestedItem) => nestedItem.value === newActiveItem
          );
        }
        return submenuItem.value === newActiveItem;
      });

      if (hasActiveSubmenu) {
        setOpenMenu(menuItem.menu);
        menuItem.submenu.forEach((submenuItem) => {
          if (
            "submenu" in submenuItem &&
            submenuItem.submenu?.some((item) => item.value === newActiveItem)
          ) {
            setOpenSubmenus((prev) => ({ ...prev, [submenuItem.value]: true }));
          }
        });
      }
    });
  }, [pathname]);

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

  const handleToggle = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleSubmenuToggle = (submenuName: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [submenuName]: !prev[submenuName] }));
  };

  const generateUrl = (parentMenu: string, item: { value: string }) => {
    const basePath = parentMenu.toLowerCase();
    return `/${basePath}/${item.value.toLowerCase().replace(/[- ]/g, "")}`;
  };

  const isItemActive = (itemValue: string): boolean => {
    return (
      activeItem.toLowerCase().replace(/[- ]/g, "") ===
      itemValue.toLowerCase().replace(/[- ]/g, "")
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={` fixed -left-20 lg:left-0  flex flex-col justify-between w-20 top-0 h-screen bg-[#110f0f]  text-white z-50 transition-all duration-100 ${
        isExpanded || isHovered ? "w-64 left-0" : "w-0"
      }`}
      onMouseEnter={() => {
        if (!isManuallyExpanded) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isManuallyExpanded) setIsHovered(false);
      }}
    >
      <div className="flex flex-col">
      <button className="h-16 flex justify-center items-center gap-2 " onClick={() => redirect("/dashboard/crm")} >
          <img src="/logo.svg" alt="Logo" width={30} height={30} />
          {(isExpanded || isHovered) && (
            <div className="text-2xl pb-2">gnext</div>
          )}
        </button>
        <div className="p-4 ">
          {menu.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                className={`text-white w-full hover:bg-blue-200/10 flex items-center p-3 rounded-md justify-between ${
                  openMenu === item.menu ? "bg-blue-200/5" : ""
                }`}
                onClick={() => handleToggle(item.menu)}
              >
                <div className="flex items-center gap-3">
                  <div>{item.icon}</div>
                  {(isExpanded || isHovered) && <span>{item.menu}</span>}
                </div>

                {(isExpanded || isHovered) && (
                  <div>
                    {openMenu === item.menu ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                )}
              </button>

              {(isExpanded || isHovered) && openMenu === item.menu && (
                <ul className="pl-6 mt-2 space-y-1">
                  {item.submenu.map((sub, subIndex) => {
                    const subPath = generateUrl(item.menu, sub);
                    const isActive = isItemActive(sub.value);

                    return (
                      <li key={subIndex}>
                        {sub.submenu ? (
                          <>
                            <button
                              className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                                isActive
                                  ? "bg-blue-200/10"
                                  : "hover:bg-blue-200/10"
                              }`}
                              onClick={() => handleSubmenuToggle(sub.value)}
                            >
                              <span>{sub.value}</span>
                              {openSubmenus[sub.value] ? (
                                <ChevronDown size={14} />
                              ) : (
                                <ChevronRight size={14} />
                              )}
                            </button>

                            {openSubmenus[sub.value] && (
                              <ul className="pl-4 mt-1 space-y-1">
                                {sub.submenu.map((nested, nestedIndex) => (
                                  <li key={nestedIndex}>
                                    <Link href={generateUrl(item.menu, nested)}>
                                      <span
                                        className={`block w-full p-2 rounded-md cursor-pointer transition-colors ${
                                          isItemActive(nested.value)
                                            ? "bg-blue-200/10"
                                            : "hover:bg-blue-200/10"
                                        }`}
                                      >
                                        {nested.value}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link href={subPath}>
                            <span
                              className={`block w-full p-2 rounded-md cursor-pointer transition-colors ${
                                isActive
                                  ? "bg-blue-200/10"
                                  : "hover:bg-blue-200/10"
                              }`}
                            >
                              {sub.value}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;
