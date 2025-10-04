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

export default function Calendar() {
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
