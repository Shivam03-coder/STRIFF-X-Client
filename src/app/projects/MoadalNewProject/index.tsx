import React from "react";
import ReactDOM from "react-dom";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DialogBox from "@/components/Dialog";
type ModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MoadalNewProject = ({ isOpen, onClose }: ModelProps) => {
  return (
    <DialogBox isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </DialogBox>
  );
};
export default MoadalNewProject;
