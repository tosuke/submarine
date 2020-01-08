import * as React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import {
  // @ts-ignore
  ScreenStackHeaderConfig,
  // @ts-ignore
  ScreenStackHeaderRightView,
  // @ts-ignore
  ScreenStackHeaderLeftView,
  // @ts-ignore
  ScreenStackHeaderTitleView,
  // eslint-disable-next-line import/no-unresolved
} from 'react-native-screens'
import { Route, useTheme } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '../types'

type Props = NativeStackNavigationOptions & {
  route: Route<string>
}

export default function HeaderConfig(props: Props) {
  const { colors } = useTheme()
  const {
    route,
    title,
    headerRight,
    headerLeft,
    headerTitle,
    headerBackTitle,
    headerBackTitleVisible = true,
    headerHideBackButton,
    headerHideShadow,
    headerTintColor,
    headerLargeTitle,
    headerTranslucent,
    headerStyle = {},
    headerTitleStyle = {},
    headerLargeTitleStyle = {},
    headerBackTitleStyle = {},
    headerShown,
    gestureEnabled,
  } = props

  const titleString = typeof headerTitle === 'string' ? headerTitle : title !== undefined ? title : route.name
  const titleColor =
    headerTitleStyle.color !== undefined
      ? headerTitleStyle.color
      : headerTintColor !== undefined
      ? headerTintColor
      : colors.text

  const HeaderText = (
    <Text numberOfLines={1} style={[styles.title, { color: titleColor }, headerTitleStyle]}>
      {titleString}
    </Text>
  )

  return (
    <ScreenStackHeaderConfig
      hidden={headerShown === false}
      translucent={headerTranslucent === true}
      hideShadow={headerHideShadow}
      hideBackButton={headerHideBackButton}
      title={titleString}
      titleFontFamily={headerTitleStyle.fontFamily}
      titleFontSize={headerTitleStyle.fontSize}
      titleColor={titleColor}
      backTitle={headerBackTitleVisible ? headerBackTitle : ' '}
      backTitleFontFamily={headerBackTitleStyle.fontFamily}
      backTitleFontSize={headerBackTitleStyle.fontSize}
      color={headerTintColor !== undefined ? headerTintColor : colors.primary}
      gestureEnabled={gestureEnabled === undefined ? true : gestureEnabled}
      largeTitle={headerLargeTitle}
      largeTitleFontFamily={headerLargeTitleStyle.fontFamily}
      largeTitleFontSize={headerLargeTitleStyle.fontSize}
      backgroundColor={headerStyle.backgroundColor !== undefined ? headerStyle.backgroundColor : colors.card}
    >
      {headerRight !== undefined ? <ScreenStackHeaderRightView>{headerRight()}</ScreenStackHeaderRightView> : null}
      {headerLeft !== undefined ? (
        <ScreenStackHeaderLeftView>
          {Platform.OS === 'android' ? (
            <View style={styles.titleWrapper}>
              {headerLeft()}
              {typeof headerTitle === 'function' ? headerTitle() : HeaderText}
            </View>
          ) : (
            headerLeft()
          )}
        </ScreenStackHeaderLeftView>
      ) : null}

      {typeof headerTitle === 'function' && headerLeft === undefined ? (
        <ScreenStackHeaderTitleView>{headerTitle()}</ScreenStackHeaderTitleView>
      ) : null}
    </ScreenStackHeaderConfig>
  )
}

const styles = StyleSheet.create({
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: '600',
    },
    android: {
      fontSize: 20,
      fontWeight: '500',
    },
    default: {
      fontSize: 18,
      fontWeight: '500',
    },
  }),
})
