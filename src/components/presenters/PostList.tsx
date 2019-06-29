import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { Divider } from 'react-native-paper'
import { Post } from './Post'
import { Post as PostType } from '../../models'
import { useTheme } from '../hooks/useTheme';

export const PostList: React.FC<{posts: PostType[]; refreshing?: boolean; onRefresh?: () => void }> = ({
  posts,
  refreshing,
  onRefresh,
}) => {
  const theme = useTheme()

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