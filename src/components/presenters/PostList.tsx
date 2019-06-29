import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { Divider, Theme, withTheme, List } from 'react-native-paper'
import { Post } from './Post'
import { Post as PostType } from '../../models'

const PostListImpl: React.FC<{ theme: Theme; posts: PostType[]; refreshing?: boolean; onRefresh?: () => void }> = ({
  theme,
  posts,
  refreshing,
  onRefresh,
}) => {

  const renderItem = useCallback(({ item }: { item: PostType }) => <Post key={item.id} post={item} />, [])
  const keyExtractor = useCallback((item: PostType) => `${item.id}`, [])
  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: theme.colors.background }}
      data={posts}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  )
}

export const PostList = withTheme(PostListImpl)
