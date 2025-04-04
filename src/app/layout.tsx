"use client";

import { Barlow } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
    setIsManuallyExpanded((prev) => !prev);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${barlow.variable}   antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen">
            <>
              <Sidebar
                isExpanded={isSidebarExpanded}
                toggleSidebar={toggleSidebar}
                isManuallyExpanded={isManuallyExpanded}
              />

              <div
                className={`flex-1 pl-0 lg:pl-20 ${
                  isSidebarExpanded
                    ? "left-0 lg:left-64 w-[calc(100%-0rem)] lg:w-[calc(100%-16rem)]"
                    : "left-0 lg:left-20 w-[calc(100%-0rem)] lg:w-[calc(100%-5rem)]"
                }`}
              >
                <Header
                  isSidebarExpanded={isSidebarExpanded}
                  toggleSidebar={toggleSidebar}
                />
                <main className="mt-12 px-0 py-4 lg:px-6 lg:py-6 xl:py-8 xl:px-8 2xl:px-10  2xl:py-10 w-full text-[var(--foreground)] bg-[var(--primary-background)] min-h-[calc(100vh-5rem)]">
                  {children}
                </main>
              </div>
            </>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// this will be the reason to get this error of hydration mismatch

// const [hydrated, setHydrated] = useState(false);
// useEffect(() => {
//   setHydrated(true);
// }, []);
// <html lang="en" suppressHydrationWarning>
// <body className={`${hydrated ? barlow.variable : ""} antialiased`} suppressHydrationWarning>
{
  /* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */
}
