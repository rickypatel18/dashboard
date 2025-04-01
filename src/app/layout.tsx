"use client";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Loader from "@/components/loader/Loader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const roboto = Roboto({
  variable: "--font-roboto",
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
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
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
                <main className="mt-16 px-0 py-4 lg:px-6 xl:px-8 2xl:px-10 w-full text-[var(--foreground)] bg-[var(--background)] min-h-[calc(100vh-5rem)]">
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
