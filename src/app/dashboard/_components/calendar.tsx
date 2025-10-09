"use client"

import { ActivityCalendar } from 'react-activity-calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useQuery } from '@tanstack/react-query'
import { getJournal } from '../api-handler'
import { useMemo } from 'react'

type dataCalendarProps = {
  date: string
  count: number
  level: number
}

export default function Calendar({ userId }: { userId: string }) {

  const { data: journals = [] } = useQuery({
    queryKey: ["journals", userId],
    queryFn: () => getJournal({ userId }),
    enabled: !!userId,
    select: (data) => data.journals,
  });
  
  const year = new Date().getFullYear();
  const startDate = new Date(`${year}-01-01`).toISOString().split("T")[0];
  const endDate = new Date(`${year}-12-31`).toISOString().split("T")[0];


  const dataCalendar = useMemo(() => {
    if (!journals) return;
    const dateMap: Record<string, dataCalendarProps> = {};
    dateMap[startDate] = { date: startDate, count: 0, level: 0 };
    for (const journal of journals) {
      const date = new Date(journal.createdAt).toISOString().split("T")[0];
      if (dateMap[date]) {
        dateMap[date].count += 1;

        if(dateMap[date].count >= 3) dateMap[date].level = 2;
        else if(dateMap[date].count >= 5) dateMap[date].level = 3;
        else if(dateMap[date].count >= 7) dateMap[date].level = 4;

      }
      else {
        dateMap[date] = { date, count: 1, level: 1 };
      }
    };
    dateMap[endDate] = { date: endDate, count: 0, level: 0 };
    return Object.values(dateMap);
  }, [journals]);

  const safeData = dataCalendar && dataCalendar.length > 0? dataCalendar :
  [
    { date: startDate, count: 0, level: 0 },
    { date: endDate, count: 0, level: 0 },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Journal Calendar</CardTitle>
        <CardDescription>Your mood helps tell your story.</CardDescription>
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        <div className="flex">
          <ActivityCalendar
            data={safeData} 
            showWeekdayLabels
            colorScheme="light"
            blockSize={12}
            blockMargin={2}
            renderBlock={(block, activity) => {
              return (
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    {block}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {`${activity.count} journal${activity.count !== 1 ? 's' : ''} on ${activity.date}`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
