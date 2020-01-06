import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack/src/index'
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

export type AppNavigationProps = StackNavigationProp<AppParamList>

export type AppPropsList = {
  [K in keyof AppParamList]: {
    route: RouteProp<AppParamList, K>
    navigation: StackNavigationProp<AppParamList, K>
  }
}

const AppStack = createStackNavigator<AppParamList>()

export const AppNavigator = () => {
  const authBloc = useAuthBloc()
  const loading = useObservable(() => authBloc.loading$, true)
  const seaClient = useObservable(() => authBloc.seaClient$, undefined)

  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}
      keyboardHandlingEnabled={false}
    >
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
