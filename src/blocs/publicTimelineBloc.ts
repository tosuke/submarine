import { Observer, BehaviorSubject, Subject, Observable, Subscription } from 'rxjs'
import { switchMap, debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators'
import { ValueObservable } from '../utils/valueObservable'
import { Post } from '../models'
import { SeaClient } from '../infra/seaClient'

export interface TimelineBloc {
  readonly fetchLatestPosts$: Observer<void>
  readonly fetchMorePosts$: Observer<void>
  readonly scrollToTop$: Observer<void>

  readonly posts$: ValueObservable<readonly Post[]>
  readonly isFetchingLatestPosts$: ValueObservable<boolean>
  readonly isFetchingMorePosts$: ValueObservable<boolean>
  readonly scrollToTopEvent$: Observable<void>
  readonly connectedToSocket$: Observable<boolean>
}

export class PublicTimelineBloc implements TimelineBloc {
  private _timelineSub: Subscription
  private _connectedSub: Subscription

  // Input Controllers
  private _fetchLatestPosts$ = new Subject<void>()
  private _fetchMorePosts$ = new Subject<void>()
  private _scrollToTop$ = new Subject<void>()

  // Output Controllers
  private _posts$ = new BehaviorSubject<readonly Post[]>([])
  private _isFetchingLatestPosts$ = new BehaviorSubject(false)
  private _isFetchingMorePosts$ = new BehaviorSubject(false)

  // Inputs
  get fetchLatestPosts$(): Observer<void> {
    return this._fetchLatestPosts$
  }
  get fetchMorePosts$(): Observer<void> {
    return this._fetchMorePosts$
  }
  get scrollToTop$(): Observer<void> {
    return this._scrollToTop$
  }

  // Outputs
  get posts$(): ValueObservable<readonly Post[]> {
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
  readonly connectedToSocket$: Observable<boolean>

  constructor(seaClient: SeaClient, initialPostsNum: number, postsNumOnLoadMore: number) {
    this._timelineSub = seaClient.publicTimeline$.subscribe(post => {
      this.insertPosts([post])
    })

    this.connectedToSocket$ = seaClient.publicTimelineConnectionState$.pipe(
      map(state => state === 'OPEN'),
      distinctUntilChanged(),
    )

    this._connectedSub = this.connectedToSocket$
      .pipe(
        filter(b => b),
        filter(() => !this._isFetchingLatestPosts$.value),
        switchMap(async () => {
          const posts = this._posts$.value
          if (posts.length === 0) return
          const sinceId = posts[0].id
          this.insertPosts(await seaClient.fetchLatestPostsFromPublicTimeline(initialPostsNum, sinceId))
        }),
      )
      .subscribe()

    this._fetchLatestPosts$
      .pipe(
        debounceTime(200),
        switchMap(async () => {
          this._isFetchingLatestPosts$.next(true)
          try {
            const posts = await seaClient.fetchLatestPostsFromPublicTimeline(initialPostsNum)
            this.insertPosts(posts)
          } finally {
            this._isFetchingLatestPosts$.next(false)
          }
        }),
      )
      .subscribe()

    let fetchingMaxId: number = -1
    this._fetchMorePosts$
      .pipe(
        debounceTime(200),
        filter(() => !this._isFetchingLatestPosts$.value), // when refreshing
        switchMap(async () => {
          try {
            const posts = this._posts$.value

            const maxId = posts[posts.length - 1].id
            if (fetchingMaxId > maxId) return
            fetchingMaxId = maxId
            this._isFetchingMorePosts$.next(true)

            const newPosts = await seaClient.fetchMorePostsFromPublicTimeline(postsNumOnLoadMore, maxId)

            this.insertPosts(newPosts)
          } catch (e) {
            console.error(e)
            throw e
          } finally {
            fetchingMaxId = -1
            this._isFetchingMorePosts$.next(false)
          }
        }),
      )
      .subscribe({
        error: err => {
          console.error(err)
        },
      })

    this._fetchLatestPosts$.next()
  }

  dispose(): void {
    this._timelineSub.unsubscribe()
    this._connectedSub.unsubscribe()
    this._fetchLatestPosts$.unsubscribe()
    this._fetchMorePosts$.unsubscribe()
    this._isFetchingLatestPosts$.unsubscribe()
    this._isFetchingMorePosts$.unsubscribe()
    this._posts$.unsubscribe()
  }

  private insertPosts(newPosts: readonly Post[]) {
    const posts = this._posts$.value
    if (posts.length === 0) {
      this._posts$.next(newPosts)
      return
    }
    if (newPosts.length === 0) return

    if (newPosts[newPosts.length - 1].id > posts[0].id) {
      this._posts$.next([...newPosts, ...posts])
    } else if (posts[posts.length - 1].id > newPosts[0].id) {
      this._posts$.next([...posts, ...newPosts])
    } else {
      let results: Post[] = []
      let i = 0,
        j = 0
      while (i < posts.length && j < newPosts.length) {
        if (posts[i].id > newPosts[j].id) {
          results.push(posts[i++])
        } else if (posts[i].id === newPosts[j].id) {
          i++
          continue
        } else {
          results.push(newPosts[j++])
        }
      }
      while (i < posts.length) {
        results.push(posts[i++])
      }
      while (j < newPosts.length) {
        results.push(newPosts[j++])
      }
      this._posts$.next(results)
    }
  }
}
