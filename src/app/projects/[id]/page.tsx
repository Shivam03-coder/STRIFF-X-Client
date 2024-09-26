"use client";
import { useState } from "react";
import Projectheader from "../Projectheader";
import Board from "../Board";

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
    </div>
  );
};

export default Project;
