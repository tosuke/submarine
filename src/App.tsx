import 'core-js/features/url'
import React from 'react'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper'
import { AppContainer } from './navigation'
import { AuthBlocProvider } from './components/hooks/useAuthBloc'
import { ThemeBlocProvider } from './components/hooks/useThemeBloc'
import { useTheme } from './components/hooks/useTheme'

const AppImpl: React.FC = () => {
  const theme = useTheme()

  return (
    <PaperProvider theme={theme}>
      <AppContainer />
    </PaperProvider>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <ThemeBlocProvider defaultTheme={DarkTheme}>
        <AuthBlocProvider>
          <AppImpl />
        </AuthBlocProvider>
      </ThemeBlocProvider>
    )
  }
}
