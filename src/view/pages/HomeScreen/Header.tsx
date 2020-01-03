import React from 'react'
import { Appbar } from 'react-native-paper'
import { AppHeader } from '../../design'

export const Header: React.FC<{ onTouchEnd?: () => void; connectedToStream?: boolean }> = ({
  onTouchEnd,
  connectedToStream,
}) => (
  <AppHeader onTouchEnd={onTouchEnd}>
    <Appbar.Content title="ホーム" />
    <Appbar.Action icon="wifi" disabled={!connectedToStream} />
  </AppHeader>
)
