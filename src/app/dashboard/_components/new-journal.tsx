"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { useMutation, useQueryClient  } from "@tanstack/react-query"
import {addJournal} from '../api-handler'
import { toast } from "sonner"

type NewJournalModalProps = {
  userId: string,
  title: string,
  content: string,
  mood: string,
  wordsCount: number
}
export default function NewJournalModal({userId} :{userId: string}) {
  const [open, setOpen] = useState(false)
  const [newJournal, setNewJournal] = useState<NewJournalModalProps>({
    userId: userId,
    title: "",
    content: "",
    mood: "",
    wordsCount: 0
  });
  const queryClient = useQueryClient();

  
  const { mutate: createJournal, isPending: isCreating } = useMutation({
    mutationFn: addJournal,
    onSuccess: () => {
      toast.success("Journal created", {
        description: "Journal created successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setNewJournal((prev) => ({
        ...prev,
        title: "",
        content: "",
        mood: "",
      }));
      queryClient.invalidateQueries({queryKey: ["journals", userId]});
      setOpen(false);
    }
  });


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!newJournal.title || !newJournal.content || !newJournal.mood) {
      toast.error("Invalid Credentials",
        {
          description: "Please fill in all fields",
          action: {
          label: "Undo",
            onClick: () => console.log("Undo"),
          },
        }
      );
      return;
    };
    newJournal.wordsCount = newJournal.content.length;
    createJournal({newJournal});

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 shadow-sm cursor-pointer group ">
          <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"/>
          <span>New Journal</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] rounded-2xl shadow-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-800">
              ✍️ Make a New Journal
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Write your thoughts, reflections, or daily notes here.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Journal Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="My reflections today..."
                className="rounded-lg"
                value={newJournal.title}
                onChange={(e) => setNewJournal((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="grid gap-2 ">
              <Label htmlFor="content">Journal Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Start writing your journal..."
                rows={6}
                className="rounded-lg max-h-[300px]"
                value={newJournal.content}
                onChange={(e) => setNewJournal((prev) => ({ ...prev, content: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label>Mood</Label>
              <Select onValueChange={(value)=> {setNewJournal((prev) => ({ ...prev, mood: value }))}}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="How are you feeling?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Happy">😊 Happy</SelectItem>
                  <SelectItem value="Sad">😢 Sad</SelectItem>
                  <SelectItem value="Excited">🤩 Excited</SelectItem>
                  <SelectItem value="Calm">😌 Calm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-lg" disabled={isCreating}>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreating}
            >
              Save Journal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
