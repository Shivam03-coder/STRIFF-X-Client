import { useGetTaskQuery } from "@/redux/endpoints";
import { useAppSelector } from "@/redux/store";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import React, { useMemo, useState } from "react";
import "gantt-task-react/dist/index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type TimelineProps = {
  id: string;
  setIsTaskModelOpen: (isOpen: boolean) => void;
};

type GanttTask = {
  start: Date;
  end: Date;
  name: string;
  id: string;
  type: TaskTypes;
  progress: number;
  isDisabled: boolean;
};

type TaskTypes = "task" | "milestone" | "project";

const Timeline = ({ id, setIsTaskModelOpen }: TimelineProps) => {
  const isDarkmode = useAppSelector((state) => state.global.isdarkMode);

  const {
    data: Tasks,
    isError,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  const ganttTasks: GanttTask[] = useMemo(() => {
    return (
      Tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "tasks" as TaskTypes,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [Tasks]);

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
        <div className="px-4 pb-5 pt-1">
          <Button
            onClick={() => setIsTaskModelOpen(true)}
            className="bg-blue py-2 text-secondary-300"
          >
            ADD NEW TASK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
