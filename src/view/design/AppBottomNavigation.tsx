import React from 'react'
import { ViewStyle, StyleSheet } from 'react-native'
import { BottomNavigation, Theme, withTheme } from 'react-native-paper'
import { dividerColor } from './color'

const AppBottomNavigationImpl: React.FC<React.PropTypeOf<typeof BottomNavigation> & { theme: Theme }> = ({
  theme,
  barStyle: defaultBarStyle,
  activeColor,
  ...props
}) => {
  const barStyle: ViewStyle = {
    backgroundColor: theme.colors.background,
    borderColor: dividerColor(theme),
    borderTopWidth: StyleSheet.hairlineWidth * 2,
  }

  return (
    <BottomNavigation
      {...props}
      theme={theme}
      barStyle={[barStyle, defaultBarStyle]}
      activeColor={activeColor || theme.colors.primary}
    />
  )
}

export const AppBottomNavigation = withTheme(AppBottomNavigationImpl)
