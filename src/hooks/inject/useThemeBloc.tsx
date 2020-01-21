import React from 'react'
import { Theme, Provider } from 'react-native-paper'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'
import { useColorScheme } from 'react-native-appearance'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const ThemeBlocProvider: React.FC<{ lightTheme: Theme; darkTheme: Theme }> = ({
  children,
  lightTheme,
  darkTheme,
}) => {
  const scheme = useColorScheme()
  const theme = scheme === 'light' ? lightTheme : darkTheme

  return (
    <Provider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </Provider>
  )
}
