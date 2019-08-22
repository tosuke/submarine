import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { MainTab } from './Main'
import { AuthStack } from './Auth'
import { LoadingScreen } from '../components/pages/LoadingScreen'
import { PostModalScreen } from '../components/pages/PostModalScreen'

const AppStack = createStackNavigator(
  {
    Main: MainTab,
    PostModal: PostModalScreen,
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
  },
)

export const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
      Loading: LoadingScreen,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
)
