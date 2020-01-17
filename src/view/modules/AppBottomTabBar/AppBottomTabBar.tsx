import React, { useEffect, useState } from 'react'
import { View, ViewStyle, StyleSheet, Keyboard, Platform } from 'react-native'
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from 'react-native-paper'
import { QuickPostBar } from './QuickPostBar'
import { dividerColor, KeyboardAvoidingView } from '../../design'

const useTabBarVisible = () => {
  const [tabBarVisible, setTabBarVisible] = useState(true)
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.select({
        ios: 'keyboardWillShow',
        default: 'keyboardDidShow',
      }),
      () => {
        setTabBarVisible(false)
      },
    )
    const hideSub = Keyboard.addListener(
      Platform.select({
        ios: 'keyboardWillHide',
        default: 'keyboardDidHide',
      }),
      () => {
        setTabBarVisible(true)
      },
    )
    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])
  return tabBarVisible
}

const wrapperStyle: ViewStyle = {
  elevation: 8,
}

const quickPostBarStyle: ViewStyle = {
  borderTopWidth: StyleSheet.hairlineWidth,
  paddingLeft: 10,
}

const Wrapper: React.FC = Platform.select({
  default: props => <KeyboardAvoidingView style={wrapperStyle} {...props} />,
  android: props => <View style={wrapperStyle} {...props} />,
})

export const AppBottomTabBar = (props: BottomTabBarProps) => {
  const theme = useTheme()
  const tabBarVisible = useTabBarVisible()

  return (
    <Wrapper>
      <QuickPostBar style={[quickPostBarStyle, { borderColor: dividerColor(theme) }]} />
      {tabBarVisible && <BottomTabBar {...props} />}
    </Wrapper>
  )
}
