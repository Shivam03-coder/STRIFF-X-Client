import { TaskDataType } from "@/redux/endpoints/interfaces";
import { Card } from "../ui/card";
import Image from "next/image";
import { format } from "date-fns";

type TasksCardsProps = {
  task: TaskDataType;
};

const TasksCard = ({ task }: TasksCardsProps) => {
  return (
    <Card className="m-4 p-3 shadow-lg">
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileURL}
          width={400}
          height={200}
          className="h-auto w-full rounded-xl"
        />
      )}
      <p>
        <strong>ID : {task.id}</strong>
      </p>
      <p>
        <strong>TITLE : {task.title}</strong>
      </p>
      <p>
        <strong>
          DESCRIPTION : {task.description || "NO DESCRIPTION IS THERE"}
        </strong>
      </p>
      <p>
        <strong>TAGS : {task.tags}</strong>
      </p>
      <p>
        <strong>
          START DATE :{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "NOT"}
        </strong>
      </p>
      <p>
        <strong>
          DUE DATE :{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "NOT"}
        </strong>
      </p>
      <p>
        <strong>AUTHOR : {task.author?.username}</strong>
      </p>
      <p>
        <strong>ASIGNEE : {task.assignee?.username}</strong>
      </p>
    </Card>
  );
};

export default TasksCard;
