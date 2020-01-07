import React from 'react'
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack/src'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs/src'
import { RootPropsList, RootNavigationProps } from '..'
import { MaterialIcons } from '@expo/vector-icons'
import { File } from '../../../models'
import { HomeScreen } from '../../pages/HomeScreen'
import { PreferenceScreen } from '../../pages/PreferanceScreen'
import { PostModalScreen } from '../../pages/PostModalScreen'
import { FileModalScreen } from '../../pages/FileModalScreen'

type AppModalParamList = {
  Main: undefined
  PostModal: undefined
  FileModal: { files: File[]; index: number }
}

type AppModalPropsList = {
  [K in keyof AppModalParamList]: {
    route: RouteProp<AppModalParamList, K>
    navigation: CompositeNavigationProp<RootNavigationProps, StackNavigationProp<AppModalParamList, K>>
  }
}

type CompositedNavigationPropOnAppModal = CompositeNavigationProp<
  RootNavigationProps,
  StackNavigationProp<AppModalParamList>
>

type AppTabParamList = {
  Home: undefined
  Preference: undefined
}

type AppTabPropsList = {
  [K in keyof AppTabParamList]: {
    route: RouteProp<AppTabParamList, K>
    navigation: CompositeNavigationProp<CompositedNavigationPropOnAppModal, BottomTabNavigationProp<AppTabParamList, K>>
  }
}

export type AppPropsList = AppTabPropsList & AppModalPropsList

const AppModal = createStackNavigator<AppModalParamList>()
const AppTab = createBottomTabNavigator<AppTabParamList>()

export const AppNavigator = (_: RootPropsList['App']) => {
  return (
    <AppModal.Navigator initialRouteName="Main" mode="modal">
      <AppModal.Screen name="Main" options={{ headerShown: false }}>
        {_ => (
          <AppTab.Navigator initialRouteName="Home">
            <AppTab.Screen
              name="Home"
              options={{
                title: 'ホーム',
                tabBarIcon: props => <MaterialIcons {...props} name="home" />,
              }}
              component={HomeScreen}
            />
            <AppTab.Screen
              name="Preference"
              options={{
                title: '設定',
                tabBarIcon: props => <MaterialIcons {...props} name="settings" />,
              }}
              component={PreferenceScreen}
            />
          </AppTab.Navigator>
        )}
      </AppModal.Screen>
      <AppModal.Screen name="PostModal" component={PostModalScreen} />
      <AppModal.Screen name="FileModal" component={FileModalScreen} />
    </AppModal.Navigator>
  )
}
