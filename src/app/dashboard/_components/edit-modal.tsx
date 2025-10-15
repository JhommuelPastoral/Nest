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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJournal } from "../api-handler";
import { toast } from "sonner";

type NewJournalModalProps = {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: string;
  wordsCount: number;
};

export default function EditModal({
  journal,
  userId,
}: {
  journal: NewJournalModalProps;
  userId: string;
}) {
  const [open, setOpen] = useState(false);
  const [newJournal, setNewJournal] = useState<NewJournalModalProps>({
    id: journal.id,
    userId: userId,
    title: journal.title || "",
    content: journal.content || "",
    mood: journal.mood || "",
    wordsCount: journal.wordsCount || 0,
  });

  const queryClient = useQueryClient();

  const { mutate: editJournal , isPending: isCreating } = useMutation({
    mutationFn: updateJournal,
    onSuccess: () => {
      toast.success("Journal updated", {
        description: "Your journal was saved successfully ✨",
      });
      queryClient.invalidateQueries({ queryKey: ["journals", userId] });
      setOpen(false);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournal.title || !newJournal.content || !newJournal.mood) {
      toast.error("Missing Fields", {
        description: "Please complete all fields before saving.",
      });
      return;
    };

    const noChanges = newJournal.title === journal.title &&
      newJournal.content === journal.content &&
      newJournal.mood === journal.mood;
    if (noChanges) {
      toast.error("No Changes", {
        description: "You did not make any changes to your journal.",
      });
      return;
    };

    newJournal.wordsCount = newJournal.content.length;
    editJournal({ journalId: journal.id, newJournal });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex items-start justify-start">
        <Button variant="ghost" className="w-full h-auto p-0 cursor-pointer " type="button">Edit</Button>
      </DialogTrigger>

      <DialogContent  className="sm:max-w-[500px] rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl p-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">
              Edit Journal
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Update your reflections, stories, or daily thoughts below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="font-medium text-slate-700">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="My reflections today..."
                className="rounded-lg"
                value={newJournal.title}
                onChange={(e) => setNewJournal((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content" className="font-medium text-slate-700">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Start writing your thoughts..."
                rows={6}
                className="max-h-[300px] min-h-[150px]"
                value={newJournal.content}
                onChange={(e) =>
                  setNewJournal((prev) => ({ ...prev, content: e.target.value }))
                }
              />
              <p className="text-xs text-right text-slate-400">
                {newJournal.content.length} characters
              </p>
            </div>

            <div className="grid gap-2">
              <Label className="font-medium text-slate-700">Mood</Label>
              <Select
                value={newJournal.mood}
                onValueChange={(value) =>
                  setNewJournal((prev) => ({ ...prev, mood:value }))
                }
              >
                <SelectTrigger className="transition rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-400">
                  <SelectValue placeholder="How do you feel today?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Happy">😊 Happy</SelectItem>
                  <SelectItem value="Sad">😢 Sad</SelectItem>
                  <SelectItem value="Excited">🤩 Excited</SelectItem>
                  <SelectItem value="Calm">😌 Calm</SelectItem>
                  <SelectItem value="Stressed">😣 Stressed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-6">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-slate-300 hover:bg-slate-100"
                disabled={isCreating}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreating}
              className="text-white rounded-xl bg-slate-800 hover:bg-slate-900"
            >
              {isCreating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
