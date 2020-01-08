import React, { useMemo } from 'react'
import { View } from 'react-native'
import { NavigationNativeContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { LoadingView } from './pages/Loading'
import { dividerColor } from './design'
import { RootNavigator } from './navigators'
import { useAuthBloc } from '../hooks/inject'
import { useObservable } from '../hooks/useObservable'
import { map } from 'rxjs/operators'

export const AppView = () => {
  const authBloc = useAuthBloc()
  const loading = useObservable(() => authBloc.loading$, true, [authBloc])
  const authRequired = useObservable(() => authBloc.seaClient$.pipe(map(x => x == null)), true, [authBloc])

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

  if (loading) return <LoadingView />
  return (
    <View style={{ backgroundColor: paperTheme.colors.background, flex: 1 }}>
      <NavigationNativeContainer theme={theme}>
        <RootNavigator authRequired={authRequired} />
      </NavigationNativeContainer>
    </View>
  )
}
