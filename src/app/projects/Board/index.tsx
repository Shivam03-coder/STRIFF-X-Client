import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskStatusData } from "@/data";
import { useGetTaskQuery, useUpdateTasksMutation } from "@/redux/endpoints";
import { PriorityDataType, TaskDataType } from "@/redux/endpoints/interfaces";
import { format } from "date-fns";
import { EllipsisVerticalIcon, Plus } from "lucide-react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type boardProps = {
  id: string;
  setIsTaskModelOpen: (isOpen: boolean) => void;
};

const Board = ({ id, setIsTaskModelOpen }: boardProps) => {
  const {
    data: Tasks,
    isError,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  const [UpdateTaskStatus] = useUpdateTasksMutation();

  const ChangeStatusOftask = async (taskId: number, newStatus: string) => {
    try {
      await UpdateTaskStatus({
        taskId: taskId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Some error occurred while fetching tasks.</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {TaskStatusData.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            Tasks={Tasks || []}
            ChangeStatusOftask={ChangeStatusOftask}
            setIsTaskModelOpen={setIsTaskModelOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

interface TaskColumnDatatype {
  key: string;
  status: string;
  Tasks: TaskDataType[];
  ChangeStatusOftask: (id: number, newStatus: string) => void;
  setIsTaskModelOpen: (isOpen: boolean) => void;
}

// TASK COLUMN COMPONENT
const TaskColumn = ({
  status,
  Tasks,
  ChangeStatusOftask,
  setIsTaskModelOpen,
}: TaskColumnDatatype) => {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item: { id: number }) => ChangeStatusOftask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const taskCount = Tasks.filter((task) => task.status === status).length;

  const statusColor: Record<string, string> = {
    "To Do": "#6439FF",
    "Work In Progress": "#FF6600",
    "Under Review": "#FCCD2A",
    Completed: "#73EC8B",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-2 sm:py-4 xl:px-2 ${isOver ? "bg-blue-50 dark:bg-primary-300" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          style={{ backgroundColor: statusColor[status] }}
          className="w-2 rounded-s-lg"
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-secondary-200 p-5 dark:bg-dark-secondary">
          <h3 className="flex items-center gap-2 text-lg dark:text-primary-700">
            {status}{" "}
            <Badge
              className="rounded-full border-none text-sm"
              style={{ backgroundColor: statusColor[status] }}
            >
              {taskCount}
            </Badge>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex-center size-6">
              <EllipsisVerticalIcon onClick={() => setIsTaskModelOpen(true)} />
            </button>
            <button className="flex-center size-6">
              <Plus />
            </button>
          </div>
        </div>
      </div>
      {Tasks.filter((task) => task.status === status).map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
};

type TaskPropType = {
  task: TaskDataType;
};

const TaskComponent = ({ task }: TaskPropType) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const tasksSplitting = task.tags ? task.tags.split(",") : [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedEndDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTags = ({ priority }: { priority: PriorityDataType }) => {
    const getPriorityColor = () => {
      switch (priority) {
        case PriorityDataType.Urgent:
          return "bg-[#FFE9D0] text-[#D91656]";
        case PriorityDataType.High:
          return "bg-[#FFE4B3] text-[#FF8C00]";
        case PriorityDataType.Medium:
          return "bg-[#E0F7FA] text-[#00796B]";
        case PriorityDataType.Backlog:
          return "bg-[#F3E5F5] text-[#7B1FA2]";
        default:
          return "bg-gray-200 text-black";
      }
    };

    return (
      <Badge
        className={`${getPriorityColor()} rounded-full border-none py-1 text-xs`}
      >
        {priority}
      </Badge>
    );
  };

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 space-y-2 rounded-md bg-secondary-300 p-4 shadow-4xl dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileURL}
          width={400}
          height={200}
          className="h-auto w-full rounded-md"
        />
      )}
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTags priority={task.priority} />}
            <div className="flex gap-2">
              {tasksSplitting.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 flex justify-between">
        <h4 className="text-base font-medium dark:text-dark-secondary">
          {task.title}
        </h4>
        {typeof task.points === "number" && (
          <div className="text-xs font-medium">{task.points}</div>
        )}
      </div>
      <div className="text-xs font-medium opacity-80 dark:text-dark-secondary">
        {formattedStartDate && <span>{formattedStartDate}</span>}
        {" - "}
        {formattedEndDate && <span>{formattedEndDate}</span>}
      </div>
      <p className="text-sm dark:text-dark-secondary">{task.description}</p>
      <div className="flex items-center justify-between">
        {task.author && (
          <Avatar>
            <AvatarImage
              className="size-full"
              src={`/${task.author?.profilePictureUrl!}`}
            />
            <AvatarFallback>
              {task.author?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div>{numberOfComments} comments</div>
      </div>
    </div>
  );
};

export default Board;
