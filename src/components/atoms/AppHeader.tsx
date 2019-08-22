import React from 'react'
import { Appbar, AppbarHeaderProps, Theme, withTheme } from 'react-native-paper'
import color from 'color'
import { ViewStyle } from 'react-native'

const AppHeaderImpl: React.FC<AppbarHeaderProps & { theme: Theme }> = ({
  children,
  theme,
  style: defaultStyle,
  ...props
}) => {
  const style: ViewStyle = {
    backgroundColor: color(theme.colors.background)
      .lighten(0.1)
      .mix(color(theme.colors.primary), 0.05)
      .string(),
  }
  return (
    <Appbar.Header theme={theme} style={[style, defaultStyle]} {...props}>
      {children}
    </Appbar.Header>
  )
}

export const AppHeader = withTheme(AppHeaderImpl)
