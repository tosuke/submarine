import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import { HomeScreen } from './components/screens/HomeScreen'
import { AuthStack } from './components/screens/Auth'
import { AuthLoadingScreen } from './components/screens/AuthLoadingScreen'

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
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
