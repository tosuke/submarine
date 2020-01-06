import React from 'react'
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '../_utils/createNativeStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootPropsList, RootNavigationProps } from '../index'
import { SignInScreen } from '../../pages/SignInScreen'
import { AuthorizeWithCodeScreen } from '../../pages/AuthorizeWithCodeScreen'

export type AuthParamList = {
  SignIn: undefined
  AuthorizeWithCode: undefined
}

export type AuthPropsList = {
  [K in keyof AuthParamList]: {
    route: RouteProp<AuthParamList, K>
    navigation: CompositeNavigationProp<NativeStackNavigationProp<AuthParamList, K>, RootNavigationProps>
  }
}

const AuthStack = createNativeStackNavigator<AuthParamList>()

export const AuthNavigator = (_: RootPropsList['Auth']) => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" options={{ headerTitle: 'ログイン' }} component={SignInScreen} />
      <AuthStack.Screen
        name="AuthorizeWithCode"
        options={{ headerTitle: 'コード認証' }}
        component={AuthorizeWithCodeScreen}
      />
    </AuthStack.Navigator>
  )
}
