"use client";

import Header from "@/components/Header";
import { useGetProjectsQuery, useGetTaskQuery } from "@/redux/endpoints";
import {
  PriorityDataType,
  Projects,
  TaskDataType,
} from "@/redux/endpoints/interfaces";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TableComponent from "../projects/Table";

type Props = {};

const Homepage = (props: Props) => {
  const {
    data: Tasks,
    isError: IstaskError,
    isLoading: taskLoading,
  } = useGetTaskQuery({ projectId: parseInt("5") });
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: isProjectError,
  } = useGetProjectsQuery();
  if (taskLoading || projectsLoading) return <div>Loading...</div>;
  if (IstaskError || isProjectError)
    return <div>Some error occurred while fetching tasks.</div>;

  const priorityCount = (Tasks ?? []).reduce(
    (acc: Record<string, number>, task: TaskDataType) => {
      const priority = task.priority as PriorityDataType;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    },
    {},
  );
  const COLORS = ["#FFD700", "#FFD700", "#FFD700", "#FFD700"]; // Yellow colors for Pie chart

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = (projects ?? []).reduce(
    (acc: Record<string, number>, project: Projects) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const chartColors = {
    bar: "#FFD700",
    barGrid: "#000000",
    pieFill: "#FFD700",
    text: "#000000",
  };

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  return (
    <div className="px-4 pb-8 xl:px-6">
      <Header name="Project Management System" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid} // Black grid lines
              />
              <XAxis dataKey="name" stroke={chartColors.text} />{" "}
              {/* Black text */}
              <YAxis stroke={chartColors.text} /> {/* Black text */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000000", // Black tooltip background
                  color: "#FFD700", // Yellow tooltip text
                  borderColor: "#FFD700", // Yellow border
                }}
              />
              <Legend wrapperStyle={{ color: chartColors.text }} />{" "}
              {/* Black text */}
              <Bar dataKey="count" fill={chartColors.bar} /> {/* Yellow bars */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="count"
                data={projectStatus}
                fill={chartColors.pieFill}
                label
              >
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} // Yellow fill for pie slices
                    stroke="#000000" // Black border for pie slices
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000000", // Black background for pie tooltip
                  color: "#FFD700", // Yellow text in pie tooltip
                  borderColor: "#FFD700", // Yellow border
                }}
              />
              <Legend wrapperStyle={{ color: chartColors.text }} />{" "}
              {/* Black text */}
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <TableComponent id={"3"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
