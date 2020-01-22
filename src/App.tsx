import React from 'react'
import { enableScreens } from 'react-native-screens'
import { AppearanceProvider } from 'react-native-appearance'
import { AppView } from './view'
import { DarkTheme, LightTheme } from './view/constants/theme'
import { AuthBlocProvider, ThemeProvider, PostSendBlocProvider, PreferenceProvider } from './hooks/inject'

enableScreens()

export default class App extends React.Component {
  render() {
    return (
      <AppearanceProvider>
        <PreferenceProvider>
          <ThemeProvider lightTheme={LightTheme} darkTheme={DarkTheme}>
            <AuthBlocProvider>
              <PostSendBlocProvider>
                <AppView />
              </PostSendBlocProvider>
            </AuthBlocProvider>
          </ThemeProvider>
        </PreferenceProvider>
      </AppearanceProvider>
    )
  }
}
