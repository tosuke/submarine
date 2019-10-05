import React from 'react'
import { StatusBar as NativeStatusBar, StatusBarProps as NativeStatusBarProps } from 'react-native'
import { withTheme, Theme } from 'react-native-paper'

export const StatusBar = withTheme(({ theme, ...rest }: NativeStatusBarProps & { theme: Theme }) => {
  const barStyle: NativeStatusBarProps['barStyle'] = theme.dark ? 'light-content' : 'dark-content'
  return <NativeStatusBar barStyle={rest.barStyle || barStyle} {...rest}></NativeStatusBar>
})
