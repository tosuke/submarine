import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

export const LoadingView = () => {
  useEffect(() => () => SplashScreen.hide())
  return null
}
