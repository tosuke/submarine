import React, { useCallback } from 'react'
import { useValueObservable } from '../hooks/useObservable'
import { PostList } from '../presenters/PostList'
import { usePublicTimelineBloc } from '../hooks/usePublicTimelineBloc'

export const PublicTimeline: React.FC = () => {
  const publicTLBloc = usePublicTimelineBloc()
  const posts = useValueObservable(() => publicTLBloc.posts$, [publicTLBloc])
  const refreshing = useValueObservable(() => publicTLBloc.isFetchingLatestPosts$, [publicTLBloc])
  const onRefresh = useCallback(() => publicTLBloc.fetchLatestPosts$.next(100), [publicTLBloc])

  return <PostList posts={posts} refreshing={refreshing} onRefresh={onRefresh} />
}
