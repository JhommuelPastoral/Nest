"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getJournal } from "../api-handler";
import Loading from "../loading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Smile, BookText, Pencil, Trash2 } from "lucide-react";
import NewJournalModal from "../_components/new-journal";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type JournalProps = {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: string;
  wordsCount: number;
  createdAt: string;
};

export default function Journals() {
  const { data: session } = useSession();
  const { data: journals = [], isLoading } = useQuery({
    queryKey: ["journals", session?.user?.id],
    queryFn: () => getJournal({ userId: session?.user?.id as string }),
    enabled: !!session?.user?.id,
    select: (data) => data.journals,
  });

  if (!session || isLoading) return <Loading />;

  const handleEdit = (id: string) => {
    console.log("Edit journal:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete journal:", id);
  };

  return (
    <main className="w-full min-h-screen p-3 font-nunito">
      <header className="sticky top-0 flex items-center justify-between mb-10 bg-white">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Your Journals
          </h1>
          <p className="text-gray-500 ">
            A space for your thoughts, reflections, and moods.
          </p>
        </div>

        <NewJournalModal userId={session?.user?.id as string} />
      </header>

      {journals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-center">
          <BookText className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-lg text-gray-500">
            You haven’t written any journals yet. Start your first one ✍️
          </p>
        </div>
      ) : (
        <div className="grid max-w-xl grid-cols-1 gap-4 mx-auto">
          {journals.map((journal: JournalProps) => (
            <Card
              key={journal.id}
              className="rounded-md shadow-none "
            >
              <CardHeader className="flex justify-between">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p>{session.user?.name}</p>     
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <CalendarDays size={14} />{" "}
                      {new Date(journal.createdAt).toLocaleDateString()}
                    </span>                  </div>
                </div>
                <div className="space-x-2">
                  <Button size={"sm"} variant={"outline"} className="cursor-pointer"> <Pencil /> </Button>
                  <Button size={"sm"} variant={"destructive"} className="cursor-pointer"> <Trash2/> </Button>

                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <CardTitle>{journal.title}</CardTitle>
                <CardDescription>{journal.content}</CardDescription>
              </CardContent>

              <CardFooter className="flex justify-between text-sm text-gray-500 ">
                <span className="flex items-center gap-1">
                  <BookText size={14} /> {journal.wordsCount} {journal.wordsCount === 1 ? "word" : "words"}
                </span>
                <span className="flex items-center gap-1">
                  <Smile size={14} /> Mood:{" "}
                  <span className="font-medium text-gray-700">
                    {journal.mood}
                  </span>
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
