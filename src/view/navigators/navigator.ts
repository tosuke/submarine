import { RouteProp, CompositeNavigationProp } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from './NativeStack'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack/src'
import { File } from '../../models'
import { AuthStackParamList } from './Auth'
import { MainStackParamList } from './Main'
import { Platform } from 'react-native'

type ModalParamList = {
  App: undefined
  PostModal: undefined
  FileModal: { files: File[]; index: number }
}

type StackParamList = AuthStackParamList & MainStackParamList & ModalParamList

type ModalNavigationProp = StackNavigationProp<ModalParamList>

export type RootNavigationProps = CompositeNavigationProp<
  ModalNavigationProp,
  NativeStackNavigationProp<StackParamList>
>

export type RootModalPropsList = {
  [K in keyof ModalParamList]: {
    route: RouteProp<ModalParamList, K>
    navigation: StackNavigationProp<ModalParamList, K>
  }
}

export type RootStackPropsList = {
  [K in keyof StackParamList]: {
    route: RouteProp<StackParamList, K>
    navigation: CompositeNavigationProp<ModalNavigationProp, NativeStackNavigationProp<StackParamList, K>>
  }
}

export const RootModal = createStackNavigator<ModalParamList>()

export const RootStack = Platform.select({
  default: () => createNativeStackNavigator<StackParamList>(),
  android: () => createStackNavigator<StackParamList>(),
})()
