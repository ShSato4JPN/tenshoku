"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type * as React from "react";

type FormDialogProps = {
  title: string;
  description?: string;
  triggerButton: React.ReactElement;
  children: React.ReactNode;
  open: boolean;
  setOpen: () => void;
  onClose?: () => void;
};

export function FormDialog({
  title,
  description,
  triggerButton,
  children,
  open,
  setOpen,
  onClose,
}: FormDialogProps) {
  return (
    <Dialog
      onOpenChange={() => {
        setOpen();
        onClose?.();
      }}
      open={open}
    >
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
