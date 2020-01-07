import { useMemo } from 'react'
import { NavigationProp } from '@react-navigation/core'

export const useNavigationOptions = <ScreenOptions extends object>(
  navigation: NavigationProp<any, any, any, ScreenOptions>,
  factory: () => Partial<ScreenOptions>,
  deps: unknown[],
) => {
  navigation.setOptions(useMemo(factory, deps))
}
