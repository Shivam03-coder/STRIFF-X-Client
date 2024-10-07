"use client";
import Header from "@/components/Header";
import { useGetTaskbyPriorityQuery } from "@/redux/endpoints";
import { PriorityDataType, TaskDataType } from "@/redux/endpoints/interfaces";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

type Props = {
  priority: PriorityDataType;
};

const CommonPage = ({ priority }: Props) => {
  const [View, setView] = useState("lists");
  const userId: number = 1;

  const {
    data: Task,
    isLoading,
    isError: isTaskError,
  } = useGetTaskbyPriorityQuery(userId || 0, {
    skip: userId === null,
  });

  const filterData = Task?.filter(
    (task: TaskDataType) => task.priority === priority,
  );
  if (!Task || isTaskError) return <div>Some Error Ocurred</div>;

  return (
    <div className="m-5 p-4">
      <Header name="Priority" />
      <div className="mb-4 flex justify-start">
        <button
          className={`rounded-xl px-4 py-2 ${View === "lists" ? "bg-secondary-100" : "bg-secondary-300"}`}
          onClick={() => setView("lists")}
        >
          Lists
        </button>
        <button
          className={`rounded-xl px-4 py-2 ${View === "table" ? "bg-secondary-100" : "bg-secondary-300"}`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : View === "lists" ? (
        <div className="grid grid-cols-1 gap-4">
          {filterData?.map((task) => (
            <div
              key={task.id}
              className="border-gray-200 rounded-lg border bg-white p-4 shadow-lg"
            >
              <h3 className="text-gray-800 text-lg font-semibold">
                {task.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{task.description}</p>

              <div className="mt-4 flex justify-between">
                <span
                  className={`text-sm font-medium ${task.priority === "Urgent" ? "text-red-600" : "text-green-600"}`}
                >
                  Priority: {task.priority}
                </span>
                <span
                  className={`text-sm font-medium ${task.status === "Completed" ? "text-blue-600" : "text-yellow-600"}`}
                >
                  Status: {task.status}
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="hover:bg-blue-600 rounded-md bg-blue-500 px-3 py-1 text-white">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Title</TableHead>
              <TableHead className="w-[100px]">Task Id</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Start Date</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData?.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell className="text-right">
                  {task.startDate
                    ? format(new Date(task.startDate), "P")
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {task.dueDate ? format(new Date(task.dueDate), "P") : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CommonPage;
