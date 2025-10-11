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

type JournalProps = {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
  wordsCount: number;
};


export default function ChartBarLabel({ journals=[] }: { journals: JournalProps[] }) {
  

  const journalData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const counts = months.map((month, index) => {
      const monthCount = journals.filter((j : Journal) => {
        const date = new Date(j.createdAt);
        return date.getFullYear() === currentYear && date.getMonth() === index;
      }).length;

      return { month, Mood: monthCount };
    }); 
    return counts;
  }, [journals]);
  const renderFooter = () => {
    const currentMonth = new Date().getMonth();
    const prevCount = currentMonth > 0 ? journalData[currentMonth - 1]?.Mood || 0 : 0;
    const currentCount = journalData[currentMonth]?.Mood || 0;
    const diff = currentCount - prevCount;
    const growth = prevCount > 0 ? (diff / prevCount) * 100 : 0;
    const growthDisplay = Math.abs(growth).toFixed(1);

    return (
      <>
        <div className="flex gap-2 font-medium leading-none">
          {diff >= 0 ? (
            <>
              Trending up by {growthDisplay}% this month{" "}
              <TrendingUp className="w-4 h-4 text-green-500" />
            </>
          ) : (
            <>
              Slight drop of {growthDisplay}% this month{" "}
              <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total journals for {new Date().getFullYear()}
        </div>
      </>
    );
  };


  return (
    <Card className="relative h-full shadow-none bg-gradient-to-r from-gray-50 via-slate-200 to-gray-100">
      <CardHeader>
        <CardTitle>Journal Statistic</CardTitle>
        <CardDescription>Your mood helps tell your story.</CardDescription>
      </CardHeader>

      <CardContent className="pb-10">
        <ChartContainer config={chartConfig} className="w-full h-full max-w-5xl max-h-50 ">
          <LineChart
            accessibilityLayer
            data={journalData}
            margin={{ left: 12, right: 12, top: 10, bottom: 0 }}
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
      {renderFooter()}
    </CardFooter>

    </Card>
  )
}


