import React, { useContext } from 'react'
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootStackPropsList, RootNavigationProps } from '../define'

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

export const MainTab = createBottomTabNavigator<MainTabParamList>()

export const StackNavigationContext = React.createContext<RootStackPropsList['Main']['navigation'] | undefined>(
  undefined,
)

export const useStackNavigation = () => useContext(StackNavigationContext)!
