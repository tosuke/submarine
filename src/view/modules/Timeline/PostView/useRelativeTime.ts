import { useState } from 'react'
import useInterval from '@use-it/interval'
import {
  format,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns'

function relativeTime(now: Date, date: Date): string {
  if (differenceInWeeks(now, date) > 1) return format(date, 'YYYY-MM-DD')

  const days = differenceInDays(now, date)
  if (days > 0) return `${days}d`

  const hours = differenceInHours(now, date)
  if (hours > 0) return `${hours}h`

  const minutes = differenceInMinutes(now, date)
  if (minutes > 0) return `${minutes}m`

  const seconds = differenceInSeconds(now, date)
  if (seconds > 5) return `${seconds}s`

  return 'now'
}

export const useRelativeTime = (date: Date) => {
  const [time, setTime] = useState(relativeTime(new Date(), date))
  useInterval(() => setTime(relativeTime(new Date(), date)), 1000)
  return time
}
