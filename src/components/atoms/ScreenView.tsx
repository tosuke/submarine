import React from 'react'
import { View, ViewProps } from 'react-native'
import { Theme, withTheme } from 'react-native-paper'

const ScreenViewImpl: React.FC<ViewProps & { theme: Theme }> = ({ theme, style, ...props }) => {
  return <View {...props} style={[{ backgroundColor: theme.colors.background, height: '100%' }, style]} />
}

export const ScreenView = withTheme(ScreenViewImpl)
