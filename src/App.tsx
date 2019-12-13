import React from 'react'
import { DarkTheme } from 'react-native-paper'
import { enableScreens } from 'react-native-screens'
import { AppContainer } from './navigators/App'
import { StatusBar } from './view/design/StatusBar'
import { AuthBlocProvider, ThemeBlocProvider, PostSendBlocProvider } from './hooks/inject'

enableScreens()

export default class App extends React.Component {
  render() {
    return (
      <ThemeBlocProvider defaultTheme={DarkTheme}>
        <AuthBlocProvider>
          <PostSendBlocProvider>
            <StatusBar />
            <AppContainer />
          </PostSendBlocProvider>
        </AuthBlocProvider>
      </ThemeBlocProvider>
    )
  }
}
