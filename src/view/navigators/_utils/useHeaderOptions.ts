import { useMemo } from 'react'
import { useTheme } from 'react-native-paper'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const useHeaderOptions = (overrides?: NativeStackNavigationOptions) => {
  const theme = useTheme()
  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTitleStyle: {
        color: theme.colors.text,
      },
      headerTintColor: theme.colors.primary,
      headerTranslucent: true,
      ...overrides,
    }),
    [theme, overrides],
  )
  return screenOptions
}
