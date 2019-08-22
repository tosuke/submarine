import { createStackNavigator } from 'react-navigation'
import { SignInScreen } from '../components/pages/SignInScreen'
import { AuthorizeWithCodeScreen } from '../components/pages/AuthorizeWithCodeScreen'
import { StackHeader } from '../components/atoms/StackHeader'

export const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    AuthorizeWithCode: AuthorizeWithCodeScreen,
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      header: StackHeader,
    },
  },
)
