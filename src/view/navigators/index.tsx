import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from './_utils/createNativeStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LoadingScreen } from '../pages/LoadingScreen'
import { AuthNavigator } from './Auth'
import { AppNavigator } from './App'
import { useAuthBloc } from '../../hooks/inject'
import { useObservable } from '../../hooks/useObservable'

type RootParamList = {
  Loading: undefined
  Auth: undefined
  App: undefined
}

export type RootNavigationProps = NativeStackNavigationProp<RootParamList>

export type RootPropsList = {
  [K in keyof RootParamList]: {
    route: RouteProp<RootParamList, K>
    navigation: NativeStackNavigationProp<RootParamList, K>
  }
}

const RootStack = createNativeStackNavigator<RootParamList>()

export const RootNavigator = () => {
  const authBloc = useAuthBloc()
  const loading = useObservable(() => authBloc.loading$, true)
  const seaClient = useObservable(() => authBloc.seaClient$, undefined)

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {loading ? (
        <RootStack.Screen name="Loading" component={LoadingScreen} />
      ) : seaClient ? (
        <RootStack.Screen name="App" component={AppNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  )
}
