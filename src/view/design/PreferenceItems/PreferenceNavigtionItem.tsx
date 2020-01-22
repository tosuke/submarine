import React, { useCallback } from 'react'
import { useTheme, List } from 'react-native-paper'
import { PreferenceItem, PreferenceItemProps } from './PreferenceItem'
import { captionColor } from '../color'

export type PreferenceNavigationItemProps = PreferenceItemProps

export const PreferenceNavigationItem = (props: PreferenceNavigationItemProps) => {
  const theme = useTheme()
  const rightBlock = useCallback(
    () => (
      <List.Icon style={{ margin: 0, justifyContent: 'center' }} icon="chevron-right" color={captionColor(theme)} />
    ),
    [theme],
  )
  return <PreferenceItem right={rightBlock} {...props} />
}
