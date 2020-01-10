import { Subject, BehaviorSubject, Observer, Observable } from 'rxjs'
import { debounceTime, switchMap, map, distinctUntilChanged } from 'rxjs/operators'
import { Post } from '../resources/model'
import { TimelineProvider, TimelineStreamProvider, ConnectionState } from '../resources/api/timelineProvider'

const isStreamProvider = (provider: TimelineProvider | TimelineStreamProvider): provider is TimelineStreamProvider =>
  'connectToStream' in provider

export class TimelineBloc {
  // Input Controllers
  private _fetchLatestPosts$ = new Subject<void>()
  private _fetchMorePosts$ = new Subject<void>()
  private _connectToStream$ = new Subject<void>()

  // Output Controllers
  private _posts$ = new BehaviorSubject<readonly Post[]>([])
  private _fetchingLatestPosts$ = new BehaviorSubject(false)
  private _fetchingMorePosts$ = new BehaviorSubject(false)
  private _connectionState$ = new BehaviorSubject<ConnectionState>('closed')

  // Inputs
  get fetchLatestPosts$(): Observer<void> {
    return this._fetchLatestPosts$
  }
  get fetchMorePosts$(): Observer<void> {
    return this._fetchMorePosts$
  }
  get connectToStream$(): Observer<void> {
    return this._connectToStream$
  }

  // Outputs
  get posts$(): Observable<readonly Post[]> {
    return this._posts$.asObservable()
  }
  get fetchingLatestPosts$(): Observable<boolean> {
    return this._fetchingLatestPosts$.asObservable()
  }
  get fetchingMorePosts$(): Observable<boolean> {
    return this._fetchingMorePosts$.asObservable()
  }
  get connectionState$(): Observable<ConnectionState> {
    return this._connectionState$.asObservable()
  }

  constructor(
    private timelineProvider: TimelineProvider | TimelineStreamProvider,
    initialPostsNum: number,
    postsNumOnLoadMore: number,
  ) {
    this._fetchLatestPosts$
      .pipe(
        debounceTime(200),
        switchMap(async () => {
          this._fetchingLatestPosts$.next(true)
          try {
            const posts = await timelineProvider.fetchLatestPosts(initialPostsNum)
            this._posts$.next(posts)
          } finally {
            this._fetchingLatestPosts$.next(false)
          }
        }),
      )
      .subscribe()

    this._fetchMorePosts$
      .pipe(
        debounceTime(200),
        switchMap(async () => {
          this._fetchingMorePosts$.next(true)
          try {
            const posts = this._posts$.value
            if (posts.length === 0) return
            const maxId = posts[posts.length - 1].id

            const newPosts = await timelineProvider.fetchMorePosts(maxId, postsNumOnLoadMore)
            this.insertPosts(newPosts)
          } finally {
            this._fetchingMorePosts$.next(false)
          }
        }),
      )
      .subscribe()

    if (!isStreamProvider(timelineProvider)) return
    this._connectToStream$.subscribe(() => timelineProvider.connectToStream())

    timelineProvider.connectionState$.subscribe(this._connectionState$)
    timelineProvider.connectionState$
      .pipe(
        map(state => state === 'connected'),
        distinctUntilChanged(),
        switchMap(async () => {
          const posts = await timelineProvider.fetchLatestPosts(initialPostsNum)
          this.insertPosts(posts)
        }),
      )
      .subscribe()

    timelineProvider.timelineEvents$.subscribe(event => {
      if (event.kind === 'added') {
        this.insertPosts([event.post])
      }
    })
  }

  dispose() {
    if (isStreamProvider(this.timelineProvider)) this.timelineProvider.dispose()
    this._connectToStream$.complete()
    this._fetchLatestPosts$.complete()
    this._fetchMorePosts$.complete()
    this._posts$.complete()
    this._fetchingLatestPosts$.complete()
    this._fetchingMorePosts$.complete()
    this._connectionState$.complete()
  }

  private insertPosts(newPosts: readonly Post[]) {
    const posts = this._posts$.value
    if (posts.length === 0) {
      this._posts$.next(newPosts)
      return
    }
    if (newPosts.length === 0) return

    if (newPosts[newPosts.length - 1].createdAt.isAfter(posts[0].createdAt)) {
      this._posts$.next([...newPosts, ...posts])
    } else if (posts[posts.length - 1].createdAt.isBefore(newPosts[0].createdAt)) {
      this._posts$.next([...posts, ...newPosts])
    } else {
      let results: Post[] = []
      let i = 0,
        j = 0
      while (i < posts.length && j < newPosts.length) {
        if (posts[i].createdAt.isAfter(newPosts[j].createdAt)) {
          results.push(posts[i++])
        } else if (posts[i].createdAt.isSame(newPosts[j].createdAt)) {
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
