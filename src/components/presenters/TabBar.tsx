import React, { useMemo } from 'react'
import { BottomTabBar, BottomTabBarProps } from 'react-navigation'
import { useTheme } from '../../hooks/useTheme'
import { TextStyle, ViewStyle } from 'react-native'

const labelStyle: TextStyle = {
  fontSize: 12,
}

export const TabBar: React.FC<BottomTabBarProps> = props => {
  const theme = useTheme()
  const style = useMemo<ViewStyle>(
    () => ({
      backgroundColor: theme.colors.surface,
    }),
    [theme],
  )
  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.colors.primary}
      inactiveTintColor={theme.colors.text}
      labelStyle={labelStyle}
      style={style}
    />
  )
}
