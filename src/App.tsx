import 'core-js/features/url'
import React from 'react'
import { DarkTheme } from 'react-native-paper'
import { useScreens } from 'react-native-screens'
import { AppContainer } from './navigators/App'
import { AuthBlocProvider } from './hooks/useAuthBloc'
import { ThemeBlocProvider } from './hooks/useThemeBloc'
import { PostSendBlocProvider } from './hooks/usePostSendBloc'

useScreens()

export default class App extends React.Component {
  render() {
    return (
      <ThemeBlocProvider defaultTheme={DarkTheme}>
        <AuthBlocProvider>
          <PostSendBlocProvider>
            <AppContainer />
          </PostSendBlocProvider>
        </AuthBlocProvider>
      </ThemeBlocProvider>
    )
  }
}
