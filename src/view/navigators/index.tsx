import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from './_utils/createNativeStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LoadingScreen } from './LoadingScreen'
import { AuthNavigator } from './Auth'
import { AppNavigator } from './App'
import { TransitionPresets } from '@react-navigation/stack/src'

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
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        /* In Android Expo 36, Submarine uses StackNavigator instead of NativeStackNAvigator*/ ...TransitionPresets.ScaleFromCenterAndroid,
      }}
      initialRouteName="Loading"
    >
      <RootStack.Screen name="App" component={AppNavigator} />
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="Loading" component={LoadingScreen} />
    </RootStack.Navigator>
  )
}
