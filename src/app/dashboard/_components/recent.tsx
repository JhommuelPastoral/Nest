"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {getJournal} from "../api-handler"

import { useQuery } from "@tanstack/react-query";
export default function Recent({userId}: {userId: string}) {
  if(!userId) return;
  const { data } = useQuery({
    queryKey: ["journal", userId],
    queryFn: () => getJournal({userId}),
    enabled: !!userId
  });
  console.log(data);

  return (
    <Card className="h-full shadow-none bg-gradient-to-r from-gray-50 via-slate-200 to-gray-100">
      <CardHeader>
        <CardTitle>Recent</CardTitle>
        <CardDescription>Recent activities</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content</p>
      </CardContent>
    </Card>
  );
}