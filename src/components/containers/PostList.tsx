import React, { useCallback, useRef } from 'react'
import { FlatList, View } from 'react-native'
import { Divider, Subheading } from 'react-native-paper'
import { Post as PostType } from '../../models'
import { useTheme } from '../hooks/useTheme'
import { PostContainer } from './PostContainer'
import { Observable, EMPTY } from 'rxjs'
import { useObservableEffect } from '../hooks/useObservableEffect'

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

  return (
    <FlatList
      ref={flatListEl}
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      removeClippedSubviews={true}
      data={posts}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      ListFooterComponent={Footer}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
    />
  )
}
