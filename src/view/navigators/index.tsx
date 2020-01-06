import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from './_utils/createNativeStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LoadingScreen } from '../pages/LoadingScreen'
import { AuthNavigator } from './Auth'
import { MainNavigator } from './Main'
import { useAuthBloc } from '../../hooks/inject'
import { useObservable } from '../../hooks/useObservable'

type AppParamList = {
  Loading: undefined
  Auth: undefined
  Main: undefined
}

export type AppNavigationProps = NativeStackNavigationProp<AppParamList>

export type AppPropsList = {
  [K in keyof AppParamList]: {
    route: RouteProp<AppParamList, K>
    navigation: NativeStackNavigationProp<AppParamList, K>
  }
}

const AppStack = createNativeStackNavigator<AppParamList>()

export const AppNavigator = () => {
  const authBloc = useAuthBloc()
  const loading = useObservable(() => authBloc.loading$, true)
  const seaClient = useObservable(() => authBloc.seaClient$, undefined)

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {loading ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : seaClient ? (
        <AppStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <AppStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </AppStack.Navigator>
  )
}
