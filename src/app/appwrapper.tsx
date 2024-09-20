import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-secondary-300 text-primary-600">
      <Sidebar />
      <main
        className={`dark:bg-dark-primary flex w-full flex-col bg-secondary-300 md:pl-64`}
      >
        <Navbar />
        {/* CHILDREN */}
      </main>
    </div>
  );
};

export default AppWrapper;
