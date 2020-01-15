import React from 'react'
import { enableScreens } from 'react-native-screens'
import { AppView } from './view'
import { StatusBar } from './view/design/StatusBar'
import { DarkTheme } from './view/constants/theme'
import { AuthBlocProvider, ThemeBlocProvider, PostSendBlocProvider } from './hooks/inject'

enableScreens()

export default class App extends React.Component {
  render() {
    return (
      <ThemeBlocProvider defaultTheme={DarkTheme}>
        <AuthBlocProvider>
          <PostSendBlocProvider>
            <AppView />
          </PostSendBlocProvider>
        </AuthBlocProvider>
      </ThemeBlocProvider>
    )
  }
}
