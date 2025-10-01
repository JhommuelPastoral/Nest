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
    date: '2024-02-01',
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
    <Card className='w-full max-w-full overflow-auto'>
      <CardHeader>
        <CardTitle>Mood</CardTitle>
        <CardDescription>Your mood helps tell your story.</CardDescription>
      </CardHeader>
      <CardContent className='w-full max-w-full overflow-auto'>
      <ActivityCalendar
        data={data}
        showWeekdayLabels
        colorScheme="light"
        renderBlock={(block, activity) => (
          <Tooltip>
            <TooltipTrigger asChild>
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
      </CardContent>
          
    </Card>

  )
  
  
}