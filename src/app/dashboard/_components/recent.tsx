"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {getJournal} from "../api-handler"

type journalProps = {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: Date;
  wordsCount: number;
}



import { useQuery } from "@tanstack/react-query";
export default function Recent({userId}: {userId: string}) {

  const { data:journals =[] } = useQuery({
    queryKey: ["journals", userId],
    queryFn: () => getJournal({userId}),
    enabled: !!userId,
    select: (data) => data.journals,
  });
  console.log(journals);
  return (
    <Card className="h-full shadow-none bg-gradient-to-r from-gray-50 via-slate-200 to-gray-100">
      <CardHeader>
        <CardTitle>Recent Journal</CardTitle>
        <CardDescription>Keep track of your most recent reflections and thoughts</CardDescription>
      </CardHeader>
      <CardContent>
      {journals.slice(0, 5).map((journal : journalProps) => (
      <div
        key={journal.id}
        className="pb-3 mb-3 border-b border-slate-200 last:border-0 last:pb-0 last:mb-0 max-h-[100px] h-full"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold truncate text-slate-800 sm:text-base">
            {journal.title}
          </h3>
          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {journal.mood}
          </span>
        </div>

        {/* Content */}
        <p className="w-full mt-1 text-sm text-slate-600 line-clamp-2">
          {journal.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>{new Date(journal.createdAt).toLocaleString()}</span>
          <span>{journal.wordsCount} words</span>
        </div>
      </div>
        
      ))}
      </CardContent>
    </Card>
  );
}