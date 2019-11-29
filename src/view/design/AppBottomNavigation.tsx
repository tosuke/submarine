import React from 'react'
import { ViewStyle } from 'react-native'
import { BottomNavigation, BottomNavigationProps, Theme, withTheme } from 'react-native-paper'
import color from 'color'
import { headerColor } from './color'

const AppBottomNavigationImpl: React.FC<BottomNavigationProps<unknown> & { theme: Theme }> = ({
  theme,
  barStyle: defaultBarStyle,
  activeColor,
  ...props
}) => {
  const borderColor = color(theme.colors.text)
    .alpha(0.1)
    .rgb()
    .string()

  const barStyle: ViewStyle = {
    backgroundColor: headerColor(theme),
    borderColor,
    borderTopWidth: 0.3,
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
