import React, { useCallback, useRef } from 'react'
import styled from 'styled-components/native'
import { FlatList, RefreshControl } from 'react-native'
import { Post } from '../../../models'
import { useTimelineBloc } from '../../../hooks/inject'
import { useObservable, useObservableEffect } from '../../../hooks/useObservable'
import { useTheme } from '../../../hooks/useTheme'
import { Divider, Subheading } from 'react-native-paper'
import { PostView } from './PostView'

const FooterView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`

const Footer = () => (
  <>
    <Divider />
    <FooterView>
      <Subheading>Loading...</Subheading>
    </FooterView>
  </>
)

const PostViewWrapper = styled.View`
  margin-vertical: 6;
  margin-horizontal: 10;
`

const PostItem = ({ item }: { item: Post }) => (
  <PostViewWrapper>
    <PostView post={item} />
  </PostViewWrapper>
)

const postKeyExtractor = (item: Post) => `${item.id}`

export const MainView: React.FC = () => {
  const timelineBloc = useTimelineBloc()
  const posts = useObservable(() => timelineBloc.posts$, [], [timelineBloc])
  const refreshing = useObservable(() => timelineBloc.isFetchingLatestPosts$, false, [timelineBloc])

  const refresh = useCallback(() => timelineBloc.fetchLatestPosts$.next(), [timelineBloc])
  const loadMore = useCallback(() => timelineBloc.fetchMorePosts$.next(), [timelineBloc])

  const theme = useTheme()

  const flatList = useRef<FlatList<Post>>(null)
  useObservableEffect(
    () => timelineBloc.scrollToTopEvent$,
    () => {
      if (flatList.current) {
        flatList.current.scrollToIndex({ animated: true, index: 0 })
      }
    },
    [timelineBloc],
  )

  const refreshControl = (
    <RefreshControl
      tintColor={theme.colors.text}
      progressBackgroundColor={theme.colors.background}
      colors={[theme.colors.primary]}
      refreshing={refreshing || false}
      onRefresh={refresh}
    />
  )

  return (
    <FlatList
      ref={flatList}
      indicatorStyle={theme.dark ? 'white' : 'black'}
      refreshControl={refreshControl}
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      removeClippedSubviews
      data={posts}
      renderItem={PostItem}
      keyExtractor={postKeyExtractor}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={Footer}
      onEndReached={loadMore}
    />
  )
}
