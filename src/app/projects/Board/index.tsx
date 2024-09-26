import { TaskStatusData } from "@/data";
import { useGetTaskQuery, useUpdateTasksMutation } from "@/redux/endpoints";
import { TaskDataType } from "@/redux/endpoints/interfaces";
import { DndProvider, useDrop } from "react-dnd";
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
  } = useGetTaskQuery({
    projectId: Number(id),
  });
  const [UpdateTaskStatus] = useUpdateTasksMutation();

  const ChangeStatusOftask = async (id: number, newStatus: string) => {
    await UpdateTaskStatus({
      taskId: id,
      status: newStatus,
    });
  };
  if (isLoading) return <div>Loading......</div>;
  if (isError) return <div>Some Error occured while fetching Task</div>;

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

const TaskColumn = ({
  key,
  Tasks,
  ChangeStatusOftask,
  setIsTaskModelOpen,
  status,
}: TaskColumnDatatype) => {
  // CODE FOR DRAG AND DROP USING REACT DND
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => ChangeStatusOftask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taksCount = Tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#00000o",
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
          style={{
            backgroundColor: statusColor[status],
          }}
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
        >
          
        </div>
      </div>
    </div>
  );
};

export default Board;
