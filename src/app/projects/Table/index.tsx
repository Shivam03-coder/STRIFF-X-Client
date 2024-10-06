import { useGetTaskQuery } from "@/redux/endpoints";
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
import { Button } from "@/components/ui/button";

type TableProps = {
  id: string;
  setIsTaskModelOpen ?: (isOpen: boolean) => void;
};

const TableComponent = ({ id, setIsTaskModelOpen }: TableProps) => {
  const {
    data: Tasks,
    isError,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Some error occurred while fetching tasks.</div>;

  const statusColors: Record<string, string> = {
    High: "#ff4d4f",
    Urgent: "#ffec3d",
    Medium: "#1890ff",
  };

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-secondary-300">
          TABLE
        </h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary-100">
            <TableHead className="w-[100px]">TASK</TableHead>
            <TableHead>DESCRIPTION</TableHead>
            <TableHead>PRIORITY</TableHead>
            <TableHead>TAGS</TableHead>
            <TableHead>START DATE</TableHead>
            <TableHead>END DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Tasks?.map((task) => (
            <TableRow key={task.id} className="space-y-3">
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full p-1 ${
                    task.priority ? `bg-[${statusColors[task.priority]}]` : ""
                  }`}
                  style={{
                    backgroundColor: task.priority
                      ? statusColors[task.priority]
                      : "#D1D5DB",
                    color: "#ffffff",
                  }}
                >
                  {task.priority || "N/A"}
                </span>
              </TableCell>
              <TableCell>
                <span className={`rounded-full bg-blue-500 p-1`}>
                  {task.tags}
                </span>
              </TableCell>
              <TableCell>
                {task.startDate
                  ? format(new Date(task.startDate as string), "P")
                  : ""}
              </TableCell>
              <TableCell>
                {task.dueDate
                  ? format(new Date(task.dueDate as string), "P")
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
