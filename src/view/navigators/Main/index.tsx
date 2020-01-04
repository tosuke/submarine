import React from 'react'
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp, TransitionPresets } from '@react-navigation/stack/src'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs/src'
import { AppPropsList, AppNavigationProps } from '../'
import { MaterialIcons } from '@expo/vector-icons'
import { File } from '../../../models'
import { HomeScreen } from '../../pages/HomeScreen'
import { PreferenceScreen } from '../../pages/PreferanceScreen'
import { PostModalScreen } from '../../pages/PostModalScreen'
import { FileModalScreen } from '../../pages/FileModalScreen'

type MainModalParamList = {
  Main: undefined
  PostModal: undefined
  FileModal: { files: File[]; index: number }
}

type MainModalPropsList = {
  [K in keyof MainModalParamList]: {
    route: RouteProp<MainModalParamList, K>
    navigation: CompositeNavigationProp<AppNavigationProps, StackNavigationProp<MainModalParamList, K>>
  }
}

type CompositedNavigationPropOnMainModal = CompositeNavigationProp<
  AppNavigationProps,
  StackNavigationProp<MainModalParamList>
>

type MainTabParamList = {
  Home: undefined
  Preference: undefined
}

type MainTabPropsList = {
  [K in keyof MainTabParamList]: {
    route: RouteProp<MainTabParamList, K>
    navigation: CompositeNavigationProp<
      CompositedNavigationPropOnMainModal,
      BottomTabNavigationProp<MainTabParamList, K>
    >
  }
}

export type MainPropsList = MainTabPropsList & MainModalPropsList

const MainModal = createStackNavigator<MainModalParamList>()
const MainTab = createBottomTabNavigator<MainTabParamList>()

export const MainNavigator = (_: AppPropsList['Main']) => {
  return (
    <MainModal.Navigator initialRouteName="Main" mode="modal">
      <MainModal.Screen name="Main" options={{ headerShown: false }}>
        {_ => (
          <MainTab.Navigator initialRouteName="Home">
            <MainTab.Screen
              name="Home"
              options={{
                title: 'ホーム',
                tabBarIcon: props => <MaterialIcons {...props} name="home" />,
              }}
              component={HomeScreen}
            />
            <MainTab.Screen
              name="Preference"
              options={{
                title: '設定',
                tabBarIcon: props => <MaterialIcons {...props} name="settings" />,
              }}
              component={PreferenceScreen}
            />
          </MainTab.Navigator>
        )}
      </MainModal.Screen>
      <MainModal.Screen name="PostModal" component={PostModalScreen} />
      <MainModal.Screen
        name="FileModal"
        options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        component={FileModalScreen}
      />
    </MainModal.Navigator>
  )
}
