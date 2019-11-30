import React, { useCallback, useRef } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { Divider, Subheading } from 'react-native-paper'
import { Post as PostType } from '../../models'
import { useTheme } from '../../hooks/useTheme'
import { PostContainer } from './PostContainer'
import { Observable, EMPTY } from 'rxjs'
import { useObservableEffect } from '../../hooks/useObservable'
import { headerColor } from '../design/color'

const Footer: React.FC = () => (
  <>
    <Divider />
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      <Subheading>Loading...</Subheading>
    </View>
  </>
)

export const PostList: React.FC<{
  posts: readonly PostType[]
  refreshing?: boolean
  onRefresh?: () => void
  loadMore?: () => void
  scrollToTopEvent?: Observable<void>
}> = ({ posts, refreshing, onRefresh, loadMore, scrollToTopEvent }) => {
  const theme = useTheme()

  const renderItem = useCallback(({ item }: { item: PostType }) => <PostContainer key={item.id} post={item} />, [])
  const keyExtractor = useCallback((item: PostType) => `${item.id}`, [])

  const flatListEl = useRef<FlatList<PostType> | null>(null)
  useObservableEffect(
    () => scrollToTopEvent || EMPTY,
    () => {
      if (flatListEl.current) {
        flatListEl.current.scrollToIndex({ animated: true, index: 0 })
      }
    },
    [scrollToTopEvent],
  )

  const refreshControl = (
    <RefreshControl
      tintColor={theme.colors.text}
      progressBackgroundColor={headerColor(theme)}
      colors={[theme.colors.primary]}
      refreshing={refreshing || false}
      onRefresh={onRefresh}
    />
  )

  return (
    <FlatList
      ref={flatListEl}
      indicatorStyle={theme.dark ? 'white' : 'black'}
      refreshControl={refreshControl}
      contentContainerStyle={{ backgroundColor: theme.colors.background, marginHorizontal: 10 }}
      removeClippedSubviews={true}
      data={posts}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={Footer}
      keyExtractor={keyExtractor}
      onEndReached={loadMore}
    />
  )
}
