import React, { useCallback, useRef } from 'react'
import styled from 'styled-components/native'
import { FlatList, FlatListProps, RefreshControl } from 'react-native'
import { Divider } from 'react-native-paper'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { Post } from '../../../models'
import { useObservable } from '../../../hooks/useObservable'
import { useTheme } from '../../../hooks/useTheme'
import { TimelineActions, TimelineActionsContext } from './inject'
import { PostView } from './PostView'
import { Footer } from './Footer'

const PostViewWrapper = styled.View`
  margin-vertical: 6;
  margin-horizontal: 10;
`

const postKeyExtractor = (item: Post) => `${item.id}`

export const useTimeline = ({
  timelineBloc,
  ...actions
}: {
  timelineBloc: TimelineBloc
} & TimelineActions) => {
  const posts = useObservable(() => timelineBloc.posts$, [], [timelineBloc])
  const refreshing = useObservable(() => timelineBloc.isFetchingLatestPosts$, false, [timelineBloc])

  const refresh = useCallback(() => timelineBloc.fetchLatestPosts$.next(), [timelineBloc])
  const loadMore = useCallback(() => timelineBloc.fetchMorePosts$.next(), [timelineBloc])

  const theme = useTheme()

  const flatListRef = useRef<FlatList<Post>>(null)

  const scrollToTop = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: 0 })
    }
  }, [])

  const refreshControl = (
    <RefreshControl
      tintColor={theme.colors.text}
      progressBackgroundColor={theme.colors.background}
      colors={[theme.colors.primary]}
      refreshing={refreshing || false}
      onRefresh={refresh}
    />
  )

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <TimelineActionsContext.Provider value={actions}>
        <PostViewWrapper>
          <PostView post={item} />
        </PostViewWrapper>
      </TimelineActionsContext.Provider>
    ),
    [actions],
  )

  const flatListProps: FlatListProps<Post> = {
    indicatorStyle: theme.dark ? 'white' : 'black',
    refreshControl,
    data: posts,
    renderItem,
    keyExtractor: postKeyExtractor,
    ItemSeparatorComponent: Divider,
    ListFooterComponent: Footer,
    onEndReached: loadMore,
  }

  return {
    flatListRef,
    flatListProps,
    scrollToTop,
  }
}
