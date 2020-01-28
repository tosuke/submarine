import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

export const LoadingView = () => {
  useEffect(() => {
    return () => SplashScreen.hide()
  })
  return null
}
