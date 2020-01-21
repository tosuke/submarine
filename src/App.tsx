import React from 'react'
import { enableScreens } from 'react-native-screens'
import { AppearanceProvider } from 'react-native-appearance'
import { AppView } from './view'
import { DarkTheme, LightTheme } from './view/constants/theme'
import { AuthBlocProvider, ThemeBlocProvider, PostSendBlocProvider } from './hooks/inject'

enableScreens()

export default class App extends React.Component {
  render() {
    return (
      <AppearanceProvider>
        <ThemeBlocProvider lightTheme={LightTheme} darkTheme={DarkTheme}>
          <AuthBlocProvider>
            <PostSendBlocProvider>
              <AppView />
            </PostSendBlocProvider>
          </AuthBlocProvider>
        </ThemeBlocProvider>
      </AppearanceProvider>
    )
  }
}
