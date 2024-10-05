import { Card } from "@/components/ui/card";
import { Projects, TaskDataType, UserType } from "@/redux/endpoints/interfaces";
import React from "react";

type ProjectsCardsProps = {
  Projects: Projects;
};

export const ProjectCard = ({ Projects }: ProjectsCardsProps) => {
  return (
    <Card className="mb-5 rounded-md bg-gradient-to-r from-[#9b5de5] via-[#f15bb5] to-[#f72585] p-5 text-primary-700 shadow-lg">
      <h2 className="text-lg font-semibold">{Projects.name}</h2>
      <p className="text-sm">{Projects.description}</p>
      <p className="mt-2 text-xs">Due: {Projects.endDate}</p>
    </Card>
  );
};

type TaskCardProps = {
  Tasks: TaskDataType;
};

export const TaskCard = ({ Tasks }: TaskCardProps) => {
  return (
    <Card className="mb-5 rounded-md bg-gradient-to-r from-[#06d6a0] via-[#00bfa5] to-[#0077b6] p-5 text-primary-700 shadow-lg">
      <h2 className="text-lg font-semibold">{Tasks.title}</h2>
      <p className="text-sm">{Tasks.description}</p>
      <p className="mt-2 text-xs">Status: {Tasks.status}</p>
    </Card>
  );
};

type UserCardProps = {
  Users: UserType;
};

export const UserCard = ({ Users }: UserCardProps) => {
  return (
    <Card className="mb-5 rounded-md bg-gradient-to-r from-[#f4a261] via-[#e76f51] to-[#d62828] p-5 text-primary-700 shadow-lg">
      <h2 className="text-lg font-semibold">{Users.username}</h2>
      <p className="text-sm">{Users.email}</p>
      <p className="mt-2 text-xs">Role: {Users.cognitoId}</p>
    </Card>
  );
};
