"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getJournal } from "../api-handler";
import { NotebookPen } from "lucide-react";

type JournalProps = {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: Date;
  wordsCount: number;
};

export default function Recent({ userId }: { userId: string }) {
  const { data: journals = [] } = useQuery({
    queryKey: ["journals", userId],
    queryFn: () => getJournal({ userId }),
    enabled: !!userId,
    select: (data) => data.journals,
  });

  return (
    <Card className="h-full transition-shadow duration-300 border shadow-sm bg-gradient-to-br from-gray-50 via-white to-slate-100 hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <NotebookPen className="w-5 h-5 text-slate-700" />
          <CardTitle className="text-lg font-semibold text-slate-800">
            Recent Journals
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-slate-500">
          Keep track of your most recent reflections and thoughts
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {journals.slice(0, 5).map((journal: JournalProps) => (
          <div
            key={journal.id}
            className="p-3 transition-all duration-300 border cursor-pointer group rounded-xl border-slate-200 bg-white/70 backdrop-blur-sm hover:bg-slate-900 hover:text-white"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold truncate sm:text-base group-hover:text-slate-50">
                {journal.title}
              </h3>
              <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-800 border border-slate-200 group-hover:bg-slate-800 group-hover:text-white">
                {journal.mood}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-600 line-clamp-2 group-hover:text-slate-200">
              {journal.content}
            </p>

            <div className="flex items-center justify-between mt-3 text-xs text-slate-500 group-hover:text-slate-300">
              <span>
                {new Date(journal.createdAt).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>{journal.wordsCount} words</span>
            </div>
          </div>
        ))}

        {journals.length === 0 && (
          <div className="py-6 text-sm text-center text-slate-500">
            No journals yet. Start writing your first one ✍️
          </div>
        )}
      </CardContent>
    </Card>
  );
}
