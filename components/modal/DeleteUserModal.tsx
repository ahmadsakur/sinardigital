import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiTrash } from "react-icons/pi";
import { User } from "@/types/user";
import { UserService } from "@/services/api-service";
import toast from "react-hot-toast";

const DeleteUserModal = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteUser = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("access_token") || "";
    try {
      await UserService.deleteUser(user._id, token);
      toast.success("User deleted successfully");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PiTrash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <p className="py-4 text-neutral-400">
            Delete <span className="text-red-300 font-bold">{user.name}</span>{" "}
            from your system. The action cannot be undone. Are you sure you want
            to continue?
          </p>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-end gap-2 items-center">
          <Button variant={"secondary"} onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button disabled={isSubmitting} variant={"destructive"} onClick={handleDeleteUser} className="disabled:bg-red-200">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
