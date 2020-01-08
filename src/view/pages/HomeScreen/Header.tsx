import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import { AppHeader } from '../../design'
import { FontAwesome } from '@expo/vector-icons'

const ConnectedIcon = (props: { size: number; color: string }) => <FontAwesome {...props} name="bolt" />

export const Header: React.FC<{ onTouchEnd?: () => void; connectedToStream?: boolean }> = ({
  onTouchEnd,
  connectedToStream,
}) => {
  const theme = useTheme()
  return (
    <AppHeader onTouchEnd={onTouchEnd}>
      <Appbar.Content title="ホーム" />
      <Appbar.Action icon={ConnectedIcon} color={theme.colors.primary} disabled={!connectedToStream} />
    </AppHeader>
  )
}
