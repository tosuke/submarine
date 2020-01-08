import { useMemo } from 'react'

export const useNavigationOptions = <ScreenOptions extends object>(
  navigation: { setOptions(options: Partial<ScreenOptions>): void },
  factory: () => Partial<ScreenOptions>,
  deps: unknown[],
) => {
  navigation.setOptions(useMemo(factory, deps))
}
