"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, XAxis, LineChart, Line } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { getJournal } from "../api-handler"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

type Journal = {
  createdAt: string
  mood: string
}

export default function ChartBarLabel({ userId }: { userId: string }) {
  const { data: journals = [] } = useQuery({
    queryKey: ["journals", userId],
    queryFn: () => getJournal({ userId }),
    select: (data) => data.journals,
    enabled: !!userId,
  })

  const journalData = useMemo(() => {
    const now = new Date()
    const currentYear = now.getFullYear()

    // Prepare all 12 months first
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    // Count journals per month for the current year
    const counts = months.map((month, index) => {
      const monthCount = journals.filter((j: Journal) => {
        const date = new Date(j.createdAt)
        return date.getFullYear() === currentYear && date.getMonth() === index
      }).length

      return { month, Mood: monthCount }
    });

    return counts;
  }, [journals])

  console.log(journalData)

  return (
    <Card className="relative h-full shadow-none bg-gradient-to-r from-gray-50 via-slate-200 to-gray-100">
      <CardHeader>
        <CardTitle>Journal Statistic</CardTitle>
        <CardDescription>Your mood helps tell your story.</CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <ChartContainer config={chartConfig} className="w-full max-w-5xl max-h-40">
          <LineChart
            accessibilityLayer
            data={journalData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="Mood"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="absolute flex-col items-start gap-2 text-sm bottom-2">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total journals for the current year
        </div>
      </CardFooter>
    </Card>
  )
}
