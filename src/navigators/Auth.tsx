import { createStackNavigator } from 'react-navigation'
import { SignInScreen } from '../view/pages/SignInScreen'
import { AuthorizeWithCodeScreen } from '../view/pages/AuthorizeWithCodeScreen'
import { StackHeader } from '../view/design/StackHeader'

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
