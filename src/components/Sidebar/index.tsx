"use client";
import { ChevronDown, ChevronUp, CircleX, Home, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SidebarLinks from "./sidebarlinks";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setisSidebarOpen } from "@/redux/states";
import { prioritytAccordionLinksData, sideBarLinksData } from "@/data";

const Sidebar = () => {
  const [ShowSidebar, setShowSidebar] = useState(false);
  const { isSidebarOpen } = useAppSelector((state) => state.global);
  const [ShowProjectsAccordion, setShowProjectsAccordion] = useState(false);
  const [ShowPriorityAccordion, setShowPriorityAccordion] = useState(false);
  const dispatch = useDispatch();
  return (
    <section
      className={`fixed z-50 flex h-[100%] flex-col justify-between overflow-y-auto overflow-x-hidden bg-secondary-300 shadow-xl transition-all duration-300 dark:bg-dark-primary ${isSidebarOpen ? "hidden w-0" : "w-72"}`}
      style={{
        overflow: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <div className="flex h-[100%] w-full flex-col justify-start dark:text-secondary-100">
        <div className="z-50 flex min-h-16 w-72 items-center justify-between bg-secondary-200 px-6 dark:bg-primary-500">
          <div className="text-2xl font-bold tracking-wide">STRIFF-X</div>
          {!isSidebarOpen ? (
            <button
              className="py-3"
              onClick={() => dispatch(setisSidebarOpen(!isSidebarOpen))}
            >
              <CircleX className="size-7" />
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center gap-5 border-y-[1.5px] border-secondary-100 px-8 py-3">
          <Image src="/space.png" alt="Logo-image" width={45} height={50} />
          <div className="font-TitilliumWeb text-base font-medium">
            <h3 className="font-medium">STRIFF-TEAM</h3>
            <div className="mt-1 flex items-center gap-2">
              <Lock className="mt-1 size-4" />
              <p className="mt-2 text-sm font-medium opacity-85">Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          {sideBarLinksData.map(({ href, icon, label }, i) => (
            <SidebarLinks href={href} icon={icon} label={label} />
          ))}
        </nav>
        <button
          className="flex w-full items-center justify-between px-7 py-3"
          onClick={() => setShowProjectsAccordion((prev) => !prev)}
        >
          <span className="text-lg font-medium opacity-70">Projects</span>
          {ShowProjectsAccordion ? (
            <ChevronUp className="size-6" />
          ) : (
            <ChevronDown className="size-6" />
          )}
        </button>
        {ShowProjectsAccordion && (
          <>
            {sideBarLinksData.map(({ href, icon, label }, i) => (
              <SidebarLinks href={href} icon={icon} label={label} />
            ))}
          </>
        )}
        <button
          className="flex w-full items-center justify-between px-7 py-3"
          onClick={() => setShowPriorityAccordion((prev) => !prev)}
        >
          <span className="text-lg font-medium opacity-70">Priority</span>
          {ShowPriorityAccordion ? (
            <ChevronUp className="size-6" />
          ) : (
            <ChevronDown className="size-6" />
          )}
        </button>
        {ShowPriorityAccordion && (
          <>
            {prioritytAccordionLinksData.map(({ href, icon, label }, i) => (
              <SidebarLinks href={href} icon={icon} label={label} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
