import React, { useMemo } from 'react'
import { RootStack, RootModal } from './navigator'
import { useTheme } from '@react-navigation/native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { NativeStackNavigationOptions } from './NativeStack'
import { AuthStackScreens } from './Auth'
import { MainStackScreen } from './Main'
import { PostModalScreen } from '../pages/PostModalScreen'
import { FileModalScreen } from '../pages/FileModalScreen'
import { TransitionPresets } from '@react-navigation/stack/src'
import { StyleSheet, Platform } from 'react-native'

export { RootModalPropsList, RootStackPropsList } from './navigator'

export const RootNavigator = ({ authRequired }: { authRequired: boolean }) => {
  const theme = useTheme()
  const stackScreenOptions = useMemo<StackNavigationOptions & NativeStackNavigationOptions>(
    () =>
      Platform.select({
        android: {
          headerTintColor: theme.colors.primary,
          headerPressColorAndroid: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.text,
          },
          headerStyle: {
            borderColor: theme.colors.border,
            borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
          },
          headerRightContainerStyle: {
            marginRight: 12,
          },
        },
        default: {},
      }),
    [],
  )
  return (
    <RootModal.Navigator mode="modal">
      <RootModal.Screen name="App" options={{ headerShown: false }}>
        {_ => (
          <RootStack.Navigator initialRouteName={authRequired ? 'AuthRoot' : 'Main'} screenOptions={stackScreenOptions}>
            {AuthStackScreens()}
            {MainStackScreen()}
          </RootStack.Navigator>
        )}
      </RootModal.Screen>
      <RootModal.Screen
        name="PostModal"
        options={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }}
        component={PostModalScreen}
      />
      <RootModal.Screen name="FileModal" component={FileModalScreen} />
    </RootModal.Navigator>
  )
}
