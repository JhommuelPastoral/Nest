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
import { useEffect, useState } from 'react'
const data = [
  {
    date: '2024-01-01',
    count: 2,
    level: 1,
  },
  {
    date: '2024-12-31',
    count: 2,
    level: 1,
  }
]
type dataCalendarProps = {
  date: string;
  count: number;
  level: number
}

export default function Calendar({ userId }: { userId: string }) {
  const [dataCalendar, setDataCalendar] = useState<dataCalendarProps[]>([]);
  const { data: journals } = useQuery({
    queryKey: ["journals", userId],
    queryFn: () => getJournal({userId}),
    enabled: !!userId,
    select: (data) => data.journals,
  });
  useEffect(() => {
    if (!journals) return;

    // Step 1: map journals to { date, count, level }
    const dateArray: dataCalendarProps[] = journals.map((journal: { createdAt: Date }) => ({
      date: new Date(journal.createdAt).toISOString().split("T")[0], // ✅ gives "YYYY-MM-DD"
      count: 1,
      level: 1,
    }));

    // Step 2: merge same dates and increase count
    const dataMap: Record<string, dataCalendarProps> = {};

    for (let i = 0; i < dateArray.length; i++) {
      const currentDate = dateArray[i].date;
      if (dataMap[currentDate]) {
        dataMap[currentDate].count += 1;
      } else {
        dataMap[currentDate] = { ...dateArray[i] };
      }
    }

    // Step 3: convert back to array for ActivityCalendar
    const finalData = Object.values(dataMap);

    console.log(dataMap); // ✅ check output in console
    setDataCalendar(finalData);
  }, [journals]);



  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Journal Calendar</CardTitle>
        <CardDescription>Your mood helps tell your story.</CardDescription>
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        <div className="flex">
          <ActivityCalendar
            data={data}
            showWeekdayLabels
            colorScheme="light"
            blockSize={12}       
            blockMargin={2}      
            renderBlock={(block, activity) => (
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  {block}
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {`${activity.count} activities on ${activity.date}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
