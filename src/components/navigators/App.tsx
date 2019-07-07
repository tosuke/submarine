import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { MainTab } from './Main'
import { AuthStack } from './Auth'
import { LoadingScreen } from '../screens/LoadingScreen'

const AppStack = createStackNavigator({
  Main: MainTab
}, {
  initialRouteName: 'Main'
})

export const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
      Loading: LoadingScreen
    },{
      initialRouteName: 'Loading'
    }
  )
)
