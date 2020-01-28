import React from 'react'
import { Theme, Provider } from 'react-native-paper'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'
import { useColorScheme } from 'react-native-appearance'
import { usePreference } from './usePreference'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const useTheme = (lightTheme: Theme, darkTheme: Theme) => {
  const scheme = useColorScheme()
  const { theme: themeType } = usePreference()
  if (themeType === 'light') {
    return lightTheme
  } else if (themeType === 'dark') {
    return darkTheme
  } else {
    if (scheme === 'dark') {
      return darkTheme
    } else {
      return lightTheme
    }
  }
}

export const ThemeProvider: React.FC<{ lightTheme: Theme; darkTheme: Theme }> = ({
  children,
  lightTheme,
  darkTheme,
}) => {
  const theme = useTheme(lightTheme, darkTheme)

  return (
    <Provider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </Provider>
  )
}
