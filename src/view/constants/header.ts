import { Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

// TODO: landspcape on iPhone
export const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64,
})

export const HEADER_HEIGHT = APPBAR_HEIGHT + getStatusBarHeight()
