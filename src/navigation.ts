import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import { MainNavigator } from './components/screens/MainNavigator'
import { AuthStack } from './components/screens/Auth'
import { AuthLoadingScreen } from './components/screens/AuthLoadingScreen'

const AppStack = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
    },
  },
  {
    initialRouteName: 'Main',
  },
)

export const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
)
