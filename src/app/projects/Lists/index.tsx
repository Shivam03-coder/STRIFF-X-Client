import Header from "@/components/Header";
import TasksCard from "@/components/Taskcards";
import { useGetTaskQuery } from "@/redux/endpoints";
import { TaskDataType } from "@/redux/endpoints/interfaces";

type listsProps = {
  id: string;
  setIsTaskModelOpen: (isOpen: boolean) => void;
};

const Lists = ({ id, setIsTaskModelOpen }: listsProps) => {
  const {
    data: Tasks,
    isError,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Some error occurred while fetching tasks.</div>;
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="flex items-center justify-between px-3 lg:px-6">
        <Header name="LISTS" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {Tasks?.map((tasks: TaskDataType) => <TasksCard task={tasks} />)}
      </div>
    </div>
  );
};
export default Lists;
