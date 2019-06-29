import { Observer, BehaviorSubject, zip } from 'rxjs'
import { switchMap, debounceTime, tap } from 'rxjs/operators'
import { ValueObservable } from '../utils'
import { Post } from '../models'
import { SeaClient } from '../infra/seaClient'

export class PublicTimelineBloc {
  // Input Controllers
  private _fetchLatestPosts$: BehaviorSubject<number>

  // Output Controllers
  private _posts$ = new BehaviorSubject<Post[]>([])
  private _isFetchingLatestPosts$ = new BehaviorSubject(false)

  // Inputs
  get fetchLatestPosts$(): Observer<number> {
    return this._fetchLatestPosts$
  }

  // Outputs
  get posts$(): ValueObservable<Post[]> {
    return this._posts$
  }
  get isFetchingLatestPosts$(): ValueObservable<boolean> {
    return this._isFetchingLatestPosts$
  }

  constructor(seaClient: SeaClient, firstLoad: number = 20) {
    this._fetchLatestPosts$ = new BehaviorSubject(firstLoad)
    this._fetchLatestPosts$
      .pipe(
        debounceTime(200),
        tap(() => this._isFetchingLatestPosts$.next(true)),
        stream =>
          zip(stream, this._posts$).pipe(
            switchMap(async ([max, posts]) => {
              const sinceId = posts.length > 0 ? posts[0].id : undefined
              const newPosts = await seaClient.fetchLatestPostsFromPublicTimeline(max, sinceId)
              return newPosts.length > 0 ? [...newPosts, ...posts] : posts
            }),
            tap(posts => this._posts$.next(posts)),
          ),
        tap(
          () => {
            this._isFetchingLatestPosts$.next(false)
          },
          () => {
            this._isFetchingLatestPosts$.next(false)
          },
        ),
      )
      .subscribe()
  }

  dispose(): void {
    this._fetchLatestPosts$.unsubscribe()
    this._isFetchingLatestPosts$.unsubscribe()
    this._posts$.unsubscribe()
  }
}
