"use client";
import { useState } from "react";
import Projectheader from "../Projectheader";
import Board from "../Board";
import Lists from "../Lists";
import Timeline from "../TimeLine";
import TableComponent from "../Table";
type Props = {
  params: {
    id: string;
  };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [ActiveTab, setActiveTab] = useState("Board");
  const [IsTaskModelOpen, setIsTaskModelOpen] = useState(false);
  return (
    <div>
      <Projectheader setActiveTab={setActiveTab} ActiveTab={ActiveTab} />
      {ActiveTab === "Board" && (
        <Board id={id} setIsTaskModelOpen={setIsTaskModelOpen} />
      )}
      {ActiveTab === "List" && (
        <Lists id={id} setIsTaskModelOpen={setIsTaskModelOpen} />
      )}
      {ActiveTab === "Timeline" && (
        <Timeline id={id} setIsTaskModelOpen={setIsTaskModelOpen} />
      )}
      {ActiveTab === "Table" && (
        <TableComponent id={id} setIsTaskModelOpen={setIsTaskModelOpen} />
      )}
    </div>
  );
};

export default Project;
