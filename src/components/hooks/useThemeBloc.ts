import React, { createContext, useMemo, useEffect, createElement, useContext } from 'react'
import { Theme } from 'react-native-paper'
import { ThemeBloc } from '../../blocs/themeBloc'

const ThemeBlocCtx = createContext<ThemeBloc | undefined>(undefined)

export const ThemeBlocProvider: React.FC<{ defaultTheme: Theme }> = ({ children, defaultTheme }) => {
  const themeBloc = useMemo(() => new ThemeBloc(defaultTheme), [defaultTheme])
  useEffect(() => () => themeBloc.dispose(), [themeBloc])
  return createElement(ThemeBlocCtx.Provider, { value: themeBloc }, children)
}

export function useThemeBloc(): ThemeBloc {
  return useContext(ThemeBlocCtx)!
}
