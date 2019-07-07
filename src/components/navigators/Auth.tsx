import { createStackNavigator } from 'react-navigation'
import { SignInScreen } from '../screens/SignInScreen'
import { AuthorizeWithCodeScreen } from '../screens/AuthorizeWithCodeScreen'
import { StackHeader } from '../atoms/StackHeader'

export const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  AuthorizeWithCode: AuthorizeWithCodeScreen
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    header: StackHeader
  }
})