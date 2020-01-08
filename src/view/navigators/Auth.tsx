import React from 'react'
import { RootStack } from './navigator'
import { AuthRootScreen } from '../pages/Auth/AuthRootScreen'
import { AuthCodeScreen } from '../pages/Auth/AuthCodeScreen'

export type AuthStackParamList = {
  AuthRoot: undefined
  AuthCode: undefined
}

export const AuthStackScreens = () => (
  <>
    <RootStack.Screen name="AuthRoot" component={AuthRootScreen} />
    <RootStack.Screen name="AuthCode" component={AuthCodeScreen} />
  </>
)
