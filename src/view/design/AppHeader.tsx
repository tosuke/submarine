import React from 'react'
import { Appbar, AppbarHeaderProps, Theme, withTheme } from 'react-native-paper'
import { ViewStyle } from 'react-native'
import { headerColor } from '../color'

const AppHeaderImpl: React.FC<AppbarHeaderProps & { theme: Theme }> = ({
  children,
  theme,
  style: defaultStyle,
  ...props
}) => {
  const style: ViewStyle = {
    backgroundColor: headerColor(theme),
  }
  return (
    <Appbar.Header theme={theme} style={[style, defaultStyle]} {...props}>
      {children}
    </Appbar.Header>
  )
}

export const AppHeader = withTheme(AppHeaderImpl)
