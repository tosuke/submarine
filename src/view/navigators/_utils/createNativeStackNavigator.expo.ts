import { Platform } from 'react-native'
import { createNativeStackNavigator as createNativeStack } from '@react-navigation/native-stack/src'
import { createStackNavigator as createNonNativeStack } from '@react-navigation/stack/src'

export const createNativeStackNavigator = () =>
  Platform.OS === 'android' ? createNonNativeStack() : createNativeStack()
