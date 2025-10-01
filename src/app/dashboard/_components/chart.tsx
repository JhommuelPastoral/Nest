"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, LineChart, Line} from "recharts"

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

export const description = "A bar chart with a label"

const chartData = [
  { month: "January", Mood: 186 },
  { month: "February", Mood: 305 },
  { month: "March", Mood: 237 },
  { month: "April", Mood: 73 },
  { month: "May", Mood: 209 },
  { month: "June", Mood: 214 },
  { month: "July", Mood: 10 },
  { month: "August", Mood: 20 },
  { month: "September", Mood: 30 },
  { month: "October", Mood: 40 },
  { month: "November", Mood: 50 },
  { month: "December", Mood: 60 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-4)",
  },

} satisfies ChartConfig

export default function ChartBarLabel() {
  return (
    <Card className="shadow-none bg-gradient-to-r from-gray-50 via-slate-200 to-gray-100">
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>Your mood helps tell your story.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-w-5xl max-h-40">
          {/* <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Mood" fill="var(--color-desktop)" radius={5} barSize={40}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart> */}
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="Mood"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
