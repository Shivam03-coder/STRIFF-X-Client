import React from "react";
import Header from "../Header";
import { createPortal } from "react-dom";
import { Dialog } from "../ui/dialog";

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name?: string;
};

const DialogBox = ({ children, isOpen, onClose }: DialogProps) => {
  if (!isOpen) return null;
  return createPortal(
    <section>
      <Dialog open={isOpen} onOpenChange={onClose}>
        {children}
      </Dialog>
    </section>,
    document.body,
  );
};

export default DialogBox;
