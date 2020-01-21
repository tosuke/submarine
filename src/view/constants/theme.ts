import { Theme, DarkTheme as PaperDarkTheme, DefaultTheme } from 'react-native-paper'

export const LightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive',
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#039be5',
    accent: '#388e3c',
    error: '#ff1744',
  },
}

export const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  roundness: 4,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#039be5',
    accent: '#388e3c',
    error: '#ff1744',
  },
}
