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

type dataCalendarProps = {
  date: string
  count: number
  level: number
}

export default function Calendar({ userId }: { userId: string }) {
  const [dataCalendar, setDataCalendar] = useState<dataCalendarProps[]>([])

  const { data: journals = [] } = useQuery({
    queryKey: ["journals", userId],
    queryFn: () => getJournal({ userId }),
    enabled: !!userId,
    select: (data) => data.journals,
  })

  useEffect(() => {
    if (!journals) return

    const year = new Date().getFullYear() // ✅ auto current year
    const startDate = new Date(`${year}-01-01`)
    const endDate = new Date(`${year}-12-31`)
    const allDays: dataCalendarProps[] = []

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      allDays.push({ date: dateStr, count: 0, level: 0 })
    }
    const dateMap: Record<string, dataCalendarProps> = {}
    for (const day of allDays) dateMap[day.date] = day
    for (const journal of journals) {
      const date = new Date(journal.createdAt).toISOString().split("T")[0]
      if (dateMap[date]) {
        dateMap[date].count += 1
        dateMap[date].level = Math.min(4, dateMap[date].count)
      }
    }

    setDataCalendar(Object.values(dateMap))
  }, [journals])

  const safeData =dataCalendar.length > 0? dataCalendar :
    [
      { date: '2025-01-01', count: 0, level: 0 },
      { date: '2025-12-31', count: 0, level: 0 },
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
            data={safeData} // ✅ never empty
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
                    {`${activity.count} journal${
                      activity.count !== 1 ? 's' : ''
                    } on ${activity.date}`}
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
