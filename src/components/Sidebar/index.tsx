"use client";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Sidebar = () => {
  const [ShowSidebar, setShowSidebar] = useState(false);
  return (
    <section className="dark:bg-dark-primary fixed z-40 flex h-[100%] flex-col justify-between overflow-y-auto shadow-xl transition-all duration-300">
      <div className="flex h-[100%] w-full flex-col justify-start dark:text-secondary-100">
        <div className="z-50 flex min-h-16 w-64 items-center justify-center bg-secondary-200 dark:bg-primary-500">
          <div className="font-Varela text-2xl font-bold tracking-wide">
            MANAGE-META
          </div>
        </div>
        <div className="flex items-center gap-5 border-y-[1.5px] border-secondary-100 px-8 py-3">
          <Image src="/space.png" alt="Logo-image" width={45} height={50} />
          <div className="font-TitilliumWeb text-base font-medium">
            <h3 className="tracking-wider">@ META-TEAM</h3>
            <div className="mt-1 flex items-center gap-2">
              <Lock className="mt-1 size-4 " />
              <p className="text-sm mt-2 opacity-85 font-medium" >Private</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
