import React from 'react'
import { BottomTabBar, BottomTabBarProps } from 'react-navigation'
import { useTheme } from '../hooks/useTheme'

export const TabBar: React.FC<BottomTabBarProps> = props => {
  const theme = useTheme()
  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.colors.primary}
      inactiveTintColor={theme.colors.text}
      labelStyle={{
        fontSize: 12,
      }}
      style={{
        backgroundColor: theme.colors.surface,
      }}
    />
  )
}
