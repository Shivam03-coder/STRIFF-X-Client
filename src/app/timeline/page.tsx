"use client";
import { useGetProjectsQuery } from "@/redux/endpoints";
import { useAppSelector } from "@/redux/store";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import React, { useMemo, useState } from "react";
import "gantt-task-react/dist/index.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Projects } from "@/redux/endpoints/interfaces";

type TimelineProps = {
  id: string;
  setIsTaskModelOpen: (isOpen: boolean) => void;
};

type GanttTask = {
  start: Date;
  end: Date;
  name: string;
  id: string;
  type: Projects;
  progress: number;
  isDisabled: boolean;
};

type TaskTypes = "task" | "milestone" | "project";

const Timeline = ({ id, setIsTaskModelOpen }: TimelineProps) => {
  const isDarkmode = useAppSelector((state) => state.global.isdarkMode);

  const { data: projects, isError, isLoading } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypes,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (value: string) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Some error occurred while fetching tasks.</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-secondary-300">
          PROJECTS TASK TIMELINE
        </h1>
        <div className="relative inline-block w-64 text-xl">
          <Select
            value={displayOptions.viewMode}
            onValueChange={(value: string) => handleViewModeChange(value)}
          >
            <SelectTrigger className="border-none bg-secondary-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-none bg-secondary-100 p-3 outline-none">
              <SelectItem value={ViewMode.Day}>DAY</SelectItem>
              <SelectItem value={ViewMode.Week}>WEEK</SelectItem>
              <SelectItem value={ViewMode.Month}>MONTH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* // TASK TIMELINE */}
      <div className="overflow-hidden rounded-md shadow">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks || []}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor="#FFEB00"
            barBackgroundSelectedColor="#4379F2"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
