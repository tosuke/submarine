import { Post } from '../model'
import { Observable } from 'rxjs'

export interface TimelineProvider {
  fetchLatestPosts(count: number): Promise<readonly Post[]>
  fetchMorePosts(sinceId: string, count: number): Promise<readonly Post[]>
}

export type ConnectionState = 'closed' | 'closing' | 'connecting' | 'connected'

export type TimelineEvent = {
  kind: 'added'
  post: Post
}

export interface TimelineStreamProvider extends TimelineProvider {
  connectToStream(): void
  readonly connectionState$: Observable<ConnectionState>
  readonly timelineEvents$: Observable<TimelineEvent>
}
