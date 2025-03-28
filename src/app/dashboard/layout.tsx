"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
    setIsManuallyExpanded((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isManuallyExpanded={isManuallyExpanded} />

      <div className="flex-1 pl-20">
        <Header isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
        <main className="mt-16 p-0 h-[calc(100vh-5rem)] ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
