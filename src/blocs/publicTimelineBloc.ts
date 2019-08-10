import { Observer, BehaviorSubject, zip, Subject, Observable } from 'rxjs'
import { switchMap, debounceTime, tap } from 'rxjs/operators'
import { ValueObservable } from '../utils'
import { Post } from '../models'
import { SeaClient } from '../infra/seaClient'

export class PublicTimelineBloc {
  // Input Controllers
  private _fetchLatestPosts$ = new Subject<number>()
  private _fetchMorePosts$ = new Subject<number>()
  private _scrollToTop$ = new Subject<void>()

  // Output Controllers
  private _posts$ = new BehaviorSubject<Post[]>([])
  private _isFetchingLatestPosts$ = new BehaviorSubject(false)
  private _isFetchingMorePosts$ = new BehaviorSubject(false)

  // Inputs
  get fetchLatestPosts$(): Observer<number> {
    return this._fetchLatestPosts$
  }
  get fetchMorePosts$(): Observer<number> {
    return this._fetchMorePosts$
  }
  get scrollToTop$(): Observer<void> {
    return this._scrollToTop$
  }

  // Outputs
  get posts$(): ValueObservable<Post[]> {
    return this._posts$
  }
  get isFetchingLatestPosts$(): ValueObservable<boolean> {
    return this._isFetchingLatestPosts$
  }
  get isFetchingMorePosts$(): ValueObservable<boolean> {
    return this._isFetchingMorePosts$
  }
  get scrollToTopEvent$(): Observable<void> {
    return this._scrollToTop$.asObservable()
  }

  constructor(seaClient: SeaClient, firstLoad: number = 20) {
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

    let fetchingMaxId: number = -1
    this._fetchMorePosts$
      .pipe(
        debounceTime(200),
        switchMap(async count => {
          try {
            const posts = this._posts$.value

            const maxId = posts[posts.length - 1].id
            if (fetchingMaxId === maxId) return posts
            fetchingMaxId = maxId
            this._isFetchingMorePosts$.next(true)

            const newPosts = await seaClient.fetchMorePostsFromPublicTimeline(count, maxId)

            return [...this._posts$.value, ...newPosts]
          } catch(e) {
            console.error(e)
            throw e
          } finally {
            fetchingMaxId = -1
            this._isFetchingMorePosts$.next(false)
          }
        }),
      )
      .subscribe(
        posts => {
          this._posts$.next(posts)
        },
        err => {
          console.error(err)
        },
      )

    this.fetchLatestPosts$.next(firstLoad)
  }

  dispose(): void {
    this._fetchLatestPosts$.unsubscribe()
    this._fetchMorePosts$.unsubscribe()
    this._isFetchingLatestPosts$.unsubscribe()
    this._isFetchingMorePosts$.unsubscribe()
    this._posts$.unsubscribe()
  }
}
