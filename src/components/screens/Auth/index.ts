import { createStackNavigator } from 'react-navigation'
import { SignInScreen } from './SignInScreen'
import { AuthorizeWithCodeScreen } from './AuthorizeWithCodeScreen'
import { StackHeader } from '../../atoms/StackHeader'

export const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  AuthorizeWithCode: AuthorizeWithCodeScreen
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    header: StackHeader
  }
})