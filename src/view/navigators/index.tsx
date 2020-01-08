import React from 'react'
import { RootStack, RootModal } from './navigator'
import { AuthStackScreens } from './Auth'
import { MainStackScreen } from './Main'
import { PostModalScreen } from '../pages/PostModalScreen'
import { FileModalScreen } from '../pages/FileModalScreen'
import { TransitionPresets } from '@react-navigation/stack/src'

export { RootModalPropsList, RootStackPropsList } from './navigator'

export const RootNavigator = ({ authRequired }: { authRequired: boolean }) => {
  return (
    <RootModal.Navigator mode="modal">
      <RootModal.Screen name="App" options={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}>
        {_ => (
          <RootStack.Navigator initialRouteName={authRequired ? 'AuthRoot' : 'Main'}>
            {AuthStackScreens()}
            {MainStackScreen()}
            <RootStack.Screen
              name="PostModal"
              options={{ presentation: 'transparentModal', headerShown: false }}
              component={PostModalScreen}
            />
          </RootStack.Navigator>
        )}
      </RootModal.Screen>
      <RootModal.Screen name="FileModal" component={FileModalScreen} />
    </RootModal.Navigator>
  )
}
