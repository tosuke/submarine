import { interval, BehaviorSubject, Subscription, Observer, Subject } from 'rxjs'
import { map, distinctUntilChanged } from 'rxjs/operators'
import { ValueObservable } from '../utils/valueObservable'
import { Post } from '../models'
import {
  format,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns'
import { openBrowserAsync } from 'expo-web-browser'

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

export class PostBloc {
  // Input Controllers
  private _openUrl$ = new Subject<string>()

  // Output Controllers
  private _relativeTime$: BehaviorSubject<string>
  private _relativeTimeSub: Subscription

  // Inputs
  get openUrl$(): Observer<string> {
    return this._openUrl$
  }

  // Outputs
  get relativeTime$(): ValueObservable<string> {
    return this._relativeTime$
  }

  constructor(post: Post) {
    this._relativeTime$ = new BehaviorSubject(relativeTime(new Date(), post.createdAt))
    this._relativeTimeSub = interval(1000)
      .pipe(
        map(() => relativeTime(new Date(), post.createdAt)),
        distinctUntilChanged(),
      )
      .subscribe(time => {
        this._relativeTime$.next(time)
      })

    this._openUrl$.subscribe(url => {
      openBrowserAsync(url)
    })
  }

  dispose() {
    this._relativeTimeSub.unsubscribe()
    this._relativeTime$.complete()
  }
}
