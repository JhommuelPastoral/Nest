"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournal } from "../api-handler";

export default function DeleteModal({ journalId, userId }: { journalId: string, userId: string }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {mutate: deleteJournalMutation, isPending} = useMutation({
    mutationFn: deleteJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["journals", userId]});
      setOpen(false);
    },
  });

  const handleDelete = () => {
    deleteJournalMutation({journalId});
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex items-start justify-start ">
        <Button variant="ghost" className="w-full h-auto p-0 text-red-500 cursor-pointer" type="button">Delete</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] rounded-2xl shadow-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50">
        <DialogHeader>
          <DialogTitle>Delete Journal</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this journal? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-lg">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
