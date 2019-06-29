import React from 'react'
import { NavigationScreenOptions, NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation'

type OptionType =
  | NavigationScreenOptions
  | ((args: {
      navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
      navigationOptions: NavigationScreenOptions
    }) => NavigationScreenOptions)

export function withNavigationOptions(options: OptionType): <P>(c: React.ComponentType<P>) => React.ComponentType<P> {
  return <P>(C: React.ComponentType<P>) => {
    class WithNavigationOptions extends React.Component<P> {
      static navigationOptions = options

      constructor(props: P) {
        super(props)
      }

      render() {
        return React.createElement(C, this.props)
      }
    }
    return WithNavigationOptions
  }
}
