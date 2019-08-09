import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { Divider, Subheading } from 'react-native-paper'
import { Post as PostType } from '../../models'
import { useTheme } from '../hooks/useTheme'
import { PostContainer } from './PostContainer'

const Footer: React.FC = () => (
  <>
    <Divider />
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
      <Subheading>Loading...</Subheading>
    </View>
  </>
)

export const PostList: React.FC<{ posts: PostType[]; refreshing?: boolean; onRefresh?: () => void, loadMore?: () => void}> = ({
  posts,
  refreshing,
  onRefresh,
  loadMore,
}) => {
  const theme = useTheme()

  const renderItem = useCallback(({ item }: { item: PostType }) => <PostContainer key={item.id} post={item} />, [])
  const keyExtractor = useCallback((item: PostType) => `${item.id}`, [])

  return (
    <FlatList
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
