import React, { useCallback, useRef, useMemo } from 'react'
import styled from 'styled-components/native'
import { FlatList, FlatListProps, RefreshControl, RefreshControlProps } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { Post } from '../../../models'
import { useObservable } from '../../../hooks/useObservable'
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
  RefreshControl: RefreshControlComponent = RefreshControl,
  ...actions
}: {
  timelineBloc: TimelineBloc
  RefreshControl?: React.ComponentType<RefreshControlProps>
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

  const refreshControl = useMemo(
    () => (
      <RefreshControlComponent
        tintColor={theme.colors.text}
        progressBackgroundColor={theme.colors.background}
        colors={[theme.colors.primary]}
        refreshing={refreshing || false}
        onRefresh={refresh}
      />
    ),
    [RefreshControlComponent],
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
