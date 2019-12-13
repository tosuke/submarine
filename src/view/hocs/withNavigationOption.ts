import React from 'react'
import { NavigationScreenOptions, NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation'
import hoistNonReactStatics from 'hoist-non-react-statics'

export type NavigationOptionType =
  | NavigationScreenOptions
  | ((args: {
      navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>
      navigationOptions: NavigationScreenOptions
    }) => NavigationScreenOptions)

export function withNavigationOptions(
  options: NavigationOptionType,
): <P>(c: React.ComponentType<P>) => React.ComponentType<P> & { readonly navigationOptions: NavigationOptionType } {
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
    return hoistNonReactStatics(WithNavigationOptions, C, { navigationOptions: true })
  }
}
