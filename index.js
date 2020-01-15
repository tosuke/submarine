import 'core-js/features/reflect'
import { AppRegistry, Platform } from 'react-native'
import App from './App'

AppRegistry.registerComponent('submarine', () => App)

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main')
  AppRegistry.runApplication('submarine', { rootTag })
}
