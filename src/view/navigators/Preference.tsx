import React from 'react'
import { RootStack } from './define'
import { PreferenceAppThemeScreen } from '../pages/PreferenceAppTheme'

export type PreferenceStackParamList = {
  PreferenceAppTheme: undefined
}

export const PreferenceScreens = () => (
  <RootStack.Screen name="PreferenceAppTheme" component={PreferenceAppThemeScreen} />
)
