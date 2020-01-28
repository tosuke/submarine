import React from 'react'
import { RootStack } from './define'
import { PreferenceAppThemeScreen } from '../pages/PreferenceAppTheme'
import { PreferencePostViewScreen } from '../pages/PreferencePostView'

export type PreferenceStackParamList = {
  PreferenceAppTheme: undefined
  PreferencePostView: undefined
}

export const PreferenceScreens = () => (
  <>
    <RootStack.Screen name="PreferenceAppTheme" component={PreferenceAppThemeScreen} />
    <RootStack.Screen name="PreferencePostView" component={PreferencePostViewScreen} />
  </>
)
