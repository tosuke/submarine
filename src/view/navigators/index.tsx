import React, { useMemo } from 'react'
import { RootStack, RootModal } from './define'
import { useTheme } from '@react-navigation/native'
import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack/src'
import { NativeStackNavigationOptions } from './NativeStack'
import { AuthStackScreens } from './Auth'
import { MainStackScreen } from './Main'
import { PreferenceScreens } from './Preference'
import { PostModalScreen } from '../pages/PostModalScreen'
import { FileModalScreen } from '../pages/FileModalScreen'
import { StyleSheet, Platform } from 'react-native'

export { RootModalPropsList, RootStackPropsList } from './define'

const DefaultStackTransition = Platform.select({
  default: TransitionPresets.DefaultTransition,
  android: Platform.Version >= 29 ? TransitionPresets.ScaleFromCenterAndroid : TransitionPresets.DefaultTransition,
})

export const RootNavigator = ({ authRequired }: { authRequired: boolean }) => {
  const theme = useTheme()
  const stackScreenOptions = useMemo<StackNavigationOptions & NativeStackNavigationOptions>(
    () => ({
      headerStyle: {
        borderColor: theme.colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      ...Platform.select({
        android: {
          headerTintColor: theme.colors.primary,
          headerPressColorAndroid: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.text,
          },
          headerRightContainerStyle: {
            marginRight: 12,
          },
          ...DefaultStackTransition,
        },
        default: {},
      }),
    }),
    [theme],
  )
  return (
    <RootModal.Navigator mode="modal" initialRouteName="App" screenOptions={stackScreenOptions}>
      <RootModal.Screen name="App" options={{ headerShown: false }}>
        {_ => (
          <RootStack.Navigator initialRouteName={authRequired ? 'AuthRoot' : 'Main'} screenOptions={stackScreenOptions}>
            {AuthStackScreens()}
            {MainStackScreen()}
            {PreferenceScreens()}
          </RootStack.Navigator>
        )}
      </RootModal.Screen>
      <RootModal.Screen
        name="PostModal"
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
        component={PostModalScreen}
      />
      <RootModal.Screen name="FileModal" component={FileModalScreen} />
    </RootModal.Navigator>
  )
}
