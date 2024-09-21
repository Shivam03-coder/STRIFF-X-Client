"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, isdarkMode } = useAppSelector((state) => state.global);
  useEffect(() => {
    if (isdarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isdarkMode]);
  

  return (
    <div className="flex min-h-screen w-full bg-secondary-300 text-primary-600">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-secondary-300 dark:bg-dark-primary ${isSidebarOpen ? "md:pl-64" : ""}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AppLayout>{children}</AppLayout>
    </StoreProvider>
  );
};

export default AppWrapper;
