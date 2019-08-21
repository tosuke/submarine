import { Theme } from 'react-native-paper'
import { useThemeBloc } from './useThemeBloc'
import { useValueObservable } from './useObservable'

export function useTheme(): Theme {
  const themeBloc = useThemeBloc()
  const theme = useValueObservable(() => themeBloc.theme$)
  return theme
}
