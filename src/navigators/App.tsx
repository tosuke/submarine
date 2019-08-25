import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { MainTab } from './Main'
import { AuthStack } from './Auth'
import { LoadingScreen } from '../components/pages/LoadingScreen'
import { PostModalScreen } from '../components/pages/PostModalScreen'
import { FileModalScreen } from '../components/pages/FileModalScreen'

const AppStack = createStackNavigator(
  {
    Main: MainTab,
    PostModal: PostModalScreen,
    FileModal: FileModalScreen,
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
