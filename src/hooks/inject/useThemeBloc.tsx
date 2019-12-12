import React, { createContext, useMemo, useEffect, useContext } from 'react'
import { Theme, Provider } from 'react-native-paper'
import { ThemeBloc } from '../../blocs/themeBloc'
import { useValueObservable } from './../useObservable'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const ThemeBlocCtx = createContext<ThemeBloc | undefined>(undefined)

const ReactNativePaperThemeProvider: React.FC = ({ children }) => {
  const themeBloc = useThemeBloc()
  const theme = useValueObservable(() => themeBloc.theme$, [themeBloc])
  return (
    <Provider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </Provider>
  )
}

export const ThemeBlocProvider: React.FC<{ defaultTheme: Theme }> = ({ children, defaultTheme }) => {
  const themeBloc = useMemo(() => new ThemeBloc(defaultTheme), [defaultTheme])
  useEffect(() => () => themeBloc.dispose(), [themeBloc])
  return (
    <ThemeBlocCtx.Provider value={themeBloc}>
      <ReactNativePaperThemeProvider>{children}</ReactNativePaperThemeProvider>
    </ThemeBlocCtx.Provider>
  )
}

export function useThemeBloc(): ThemeBloc {
  return useContext(ThemeBlocCtx)!
}
