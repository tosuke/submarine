import React, { useMemo } from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { dividerColor } from './design'
import { RootNavigator } from './navigators'

export const AppView = () => {
  const paperTheme = useTheme()
  const theme = useMemo(
    () => ({
      dark: paperTheme.dark,
      colors: {
        primary: paperTheme.colors.primary,
        background: paperTheme.colors.background,
        card: paperTheme.colors.surface,
        text: paperTheme.colors.text,
        border: dividerColor(paperTheme),
      },
    }),
    [paperTheme],
  )
  return (
    <NavigationNativeContainer theme={theme}>
      <RootNavigator />
    </NavigationNativeContainer>
  )
}
