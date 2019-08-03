import { NavigationRouteConfigMap, createBottomTabNavigator } from 'react-navigation'
import { HomeScreen } from '../screens/HomeScreen'
import { PreferencesScreen } from '../screens/Preferences'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { TabBar } from '../presenters/TabBar'

const routeConfig: NavigationRouteConfigMap = {
  Home: HomeScreen,
  Preferences: PreferencesScreen,
}

export const MainTab = withNavigationOptions(props => {
  const state = props.navigation.state
  const route = routeConfig[state.routes[state.index].routeName]
  const options = (route.screen ? route.screen : route).navigationOptions
  return typeof options === 'function' ? options(props) : options
})(
  createBottomTabNavigator(routeConfig, {
    initialRouteName: 'Home',
    tabBarComponent: TabBar,
  }),
)
