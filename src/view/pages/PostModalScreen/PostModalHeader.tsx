import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import { AppHeader } from '../../design'

export const PostModalHeader = ({ goBack }: { goBack: () => void }) => {
  const theme = useTheme()
  return (
    <AppHeader>
      <Appbar.Action icon="close" color={theme.colors.primary} onPress={goBack} />
      <Appbar.Content title="投稿" />
    </AppHeader>
  )
}
