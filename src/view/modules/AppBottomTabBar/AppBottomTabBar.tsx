import React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from 'react-native-paper'
import { QuickPostBar } from './QuickPostBar'
import { dividerColor } from '../../design'

const wrapperStyle: ViewStyle = {
  elevation: 8,
}

const quickPostBarStyle: ViewStyle = {
  borderTopWidth: StyleSheet.hairlineWidth,
  marginLeft: 6,
}

export const AppBottomTabBar = (props: BottomTabBarProps) => {
  const theme = useTheme()
  return (
    <View style={wrapperStyle}>
      <QuickPostBar style={[quickPostBarStyle, { borderColor: dividerColor(theme) }]} />
      <BottomTabBar {...props} />
    </View>
  )
}
