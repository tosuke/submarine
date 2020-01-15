import React from 'react'
import { StatusBar as NativeStatusBar, StatusBarProps as NativeStatusBarProps, View, Platform } from 'react-native'
import { withTheme, Theme } from 'react-native-paper'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const StatusBar = withTheme(({ theme, ...rest }: NativeStatusBarProps & { theme: Theme; opaque?: boolean }) => {
  const barStyle: NativeStatusBarProps['barStyle'] = theme.dark ? 'light-content' : 'dark-content'
  const backgroundColor = theme.dark ? '#000000' : '#ffffff'
  return (
    <>
      <NativeStatusBar barStyle={barStyle} backgroundColor={backgroundColor} animated={false} {...rest} />
      {rest.opaque === true && Platform.OS === 'ios' && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: getStatusBarHeight(true),
            zIndex: 10000,
            backgroundColor: theme.colors.background,
          }}
        />
      )}
    </>
  )
})
