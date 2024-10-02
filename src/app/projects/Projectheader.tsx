import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import {
  Clock,
  FilterIcon,
  Grid3X3,
  List,
  Plus,
  Share,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import MoadalNewProject from "./MoadalNewProject";
import { Button } from "@/components/ui/button";
type Props = {
  setActiveTab: (tab: string) => void;
  ActiveTab: string;
};

const Projectheader = ({ ActiveTab, setActiveTab }: Props) => {
  const [IsModalNewProjectOpen, setIsModalNewProjectOpen] =
    useState<boolean>(false);
  return (
    <div className="px-4 xl:px-6">
      <div className="py-6 lg:py-4">
        <MoadalNewProject
          isOpen={IsModalNewProjectOpen}
          onClose={() => setIsModalNewProjectOpen(!IsModalNewProjectOpen)}
        />
        <div className="flex items-center justify-between px-3 lg:px-6">
          <Header name="PROJECT DEVELOPMENT" />
          <Button
            onClick={() => setIsModalNewProjectOpen(true)}
            className="flex items-center bg-blue px-2 py-2 text-secondary-300"
          >
            <Plus />
            ADD NEW TASK
          </Button>
        </div>
        <div className="flex flex-wrap-reverse gap-2 border-y border-secondary-100 pb-2 pt-2 dark:border-secondary-100 md:bg-center">
          <div className="flex flex-1 items-center gap-4 md:gap-4">
            <TabButton
              name="Board"
              ActiveTab={ActiveTab}
              setActiveTab={setActiveTab}
              icon={<Grid3X3 className="size-6" />}
            />
            <TabButton
              name="List"
              ActiveTab={ActiveTab}
              setActiveTab={setActiveTab}
              icon={<List className="size-6" />}
            />
            <TabButton
              name="Timeline"
              ActiveTab={ActiveTab}
              setActiveTab={setActiveTab}
              icon={<Clock className="size-6" />}
            />
            <TabButton
              name="Table"
              ActiveTab={ActiveTab}
              setActiveTab={setActiveTab}
              icon={<Grid3X3 className="size-6" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="opacity-60 hover:opacity-100 dark:text-dark-secondary">
              <FilterIcon />
            </button>
            <button className="opacity-60 hover:opacity-100 dark:text-dark-secondary">
              <Share2 />
            </button>
            <input
              placeholder="Search Text"
              className="rounded-xl bg-secondary-100 px-4 py-3 text-lg"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tab: string) => void;
  ActiveTab: string;
};

const TabButton = ({ name, icon, ActiveTab, setActiveTab }: TabButtonProps) => {
  const isActive = ActiveTab === name;

  return (
    <div className="relative">
      <button
        className={`bg-dark-secondarydark:hover:text-secondary-100 relative flex items-center gap-2 px-1 py-2 text-lg after:absolute after:-bottom-[10px] after:left-0 after:h-[1.5px] after:w-full after:hover:text-blue-500 sm:px-2 lg:px-4 ${isActive ? "text-blue-500 after:bg-blue-500 dark:text-secondary-100" : ""}`}
        onClick={() => setActiveTab(name)}
      >
        {icon}
        {name}
      </button>
    </div>
  );
};

export default Projectheader;
