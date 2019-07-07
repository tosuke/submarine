import React from 'react'
import { createBottomTabNavigator, BottomTabBar, NavigationRouteConfigMap } from 'react-navigation'
import { HomeScreen } from './HomeScreen'
import { PreferencesScreen } from './Preferences'
import { useTheme } from '../hooks/useTheme'
import { withNavigationOptions } from '../hocs/withNavigationOption'

const TabBar: React.FC<any> = props => {
  const theme = useTheme()
  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.colors.primary}
      inactiveTintColor={theme.colors.text}
      labelStyle={{
        fontSize: 12,
      }}
      style={{
        backgroundColor: theme.colors.surface,
      }}
    />
  )
}

const routesConfig: NavigationRouteConfigMap = {
  Home: HomeScreen,
  Preferences: PreferencesScreen,
}

export const MainNavigator = withNavigationOptions(props => {
  const state = props.navigation.state
  const routeConfig = routesConfig[state.routes[state.index].routeName]
  const route = ((routeConfig.screen && routeConfig.screen) || routeConfig).navigationOptions
  return typeof route === 'function' ? route(props) : route
})(
  createBottomTabNavigator(routesConfig, {
    initialRouteName: 'Home',
    tabBarComponent: props => <TabBar {...props} />,
  }),
)
