import 'core-js/features/url'
import React from 'react'
import { DarkTheme } from 'react-native-paper'
import { AppContainer } from './components/navigators/App'
import { AuthBlocProvider } from './components/hooks/useAuthBloc'
import { ThemeBlocProvider } from './components/hooks/useThemeBloc'
import { PostSendBlocProvider } from './components/hooks/usePostSendBloc'

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
