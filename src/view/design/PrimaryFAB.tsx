import React from 'react'
import { ViewStyle } from 'react-native'
import { FAB, Theme, withTheme } from 'react-native-paper'

const PrimaryFABImpl: React.FC<React.PropTypeOf<typeof FAB> & { theme: Theme }> = ({ theme, style, ...props }) => {
  const fabStyle: ViewStyle = {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
    zIndex: 100,
    backgroundColor: theme.colors.primary,
  }
  return <FAB theme={theme} style={[fabStyle, style]} {...props} />
}

export const PrimaryFAB = withTheme(PrimaryFABImpl)
