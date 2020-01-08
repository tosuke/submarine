import React from 'react'
import { StatusBar as NativeStatusBar, StatusBarProps as NativeStatusBarProps } from 'react-native'
import { withTheme, Theme } from 'react-native-paper'

export const StatusBar = withTheme(({ theme, ...rest }: NativeStatusBarProps & { theme: Theme }) => {
  const barStyle: NativeStatusBarProps['barStyle'] = theme.dark ? 'light-content' : 'dark-content'
  const backgroundColor = theme.dark ? '#000' : '#fff'
  return <NativeStatusBar barStyle={barStyle} backgroundColor={backgroundColor} {...rest} />
})
