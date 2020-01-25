import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

export const LoadingView = () => {
  useEffect(() => {
    SplashScreen.show()
    return () => SplashScreen.hide()
  })
  return null
}
