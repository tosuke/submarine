import React from 'react'
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { RootStackPropsList, RootNavigationProps, RootStack } from './navigator'
import { HomeScreen } from '../pages/HomeScreen'
import { PreferenceScreen } from '../pages/PreferanceScreen'

export type MainStackParamList = {
  Main: undefined
}

type MainTabParamList = {
  Home: undefined
  Preference: undefined
}

export type MainTabPropsList = {
  [K in keyof MainTabParamList]: {
    route: RouteProp<MainTabParamList, K>
    navigation: CompositeNavigationProp<RootNavigationProps, BottomTabNavigationProp<MainTabParamList, K>>
  }
}

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainNavigator = ({ navigation }: RootStackPropsList['Main']) => {
  navigation.setOptions({
    headerShown: false,
  })
  return (
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
  )
}

export const MainStackScreen = () => <RootStack.Screen name="Main" component={MainNavigator} />
