import React, { useState, useEffect, useCallback, useRef } from 'react'
import { View, Platform } from 'react-native'
import { Divider, List, Caption, useTheme } from 'react-native-paper'
import { ScreenView, Slider, PreferenceItem, NativeSlider, PreferenceSwitchItem } from '../../design'
import { PostView } from '../../modules/useTimeline/PostView'
import { Post, User, Application } from '../../../models'
import { usePreference, usePreferenceUpdate } from '../../../hooks/inject'

const post = new Post(
  0,
  'あああああ',
  new User(0, 'John Doe', 'john', 100, new Date(), new Date(), null),
  new Application(0, 'BOT', true),
  new Date(),
  new Date(),
  [],
)

const PostFontSizeSlider = () => {
  const theme = useTheme()
  const backgroundColor = Platform.select({
    ios: theme.colors.surface,
  })
  const sliderRef = useRef<NativeSlider>(null)
  const [sliding, setSliding] = useState(false)
  const { postFontSize } = usePreference()
  const update = usePreferenceUpdate()

  const [fontSize, setFontSize] = useState(postFontSize)

  const updateFontSize = useCallback(
    (value: number) => {
      update(state => ({ ...state, postFontSize: value }))
      setFontSize(value)
      setSliding(true)
    },
    [update],
  )
  const onSlidingComplete = useCallback(() => setSliding(false), [])

  const formattedFontSize = fontSize.toFixed(1)

  useEffect(() => {
    if (sliderRef.current && !sliding) {
      sliderRef.current.setNativeProps({
        value: postFontSize,
      })
      setFontSize(postFontSize)
    }
  }, [postFontSize, sliding])

  return (
    <View
      style={{ paddingHorizontal: 12, paddingBottom: 8, backgroundColor, flexDirection: 'row', alignItems: 'center' }}
    >
      <Caption style={{ fontSize: 16, paddingRight: 6 }}>{formattedFontSize}</Caption>
      <Slider
        ref={sliderRef}
        style={{ flex: 1 }}
        minimumValue={10}
        maximumValue={20}
        onValueChange={updateFontSize}
        onSlidingComplete={onSlidingComplete}
      />
    </View>
  )
}

const PostFontSizeItem = () => (
  <PreferenceItem title="本文の文字サイズ">
    <PostFontSizeSlider />
  </PreferenceItem>
)

const AppViaEnabledItem = () => {
  const { appViaEnabled } = usePreference()
  const update = usePreferenceUpdate()
  const onValueChange = useCallback((value: boolean) => update(state => ({ ...state, appViaEnabled: value })), [update])

  return <PreferenceSwitchItem title="アプリのvia表記" value={appViaEnabled} onValueChange={onValueChange} />
}

const ResetItem = () => {
  const theme = useTheme()
  const update = usePreferenceUpdate()
  const reset = useCallback(() => update(state => ({ ...state, postFontSize: 15, appViaEnabled: true })), [update])
  return <PreferenceItem title="リセット" titleStyle={{ color: theme.colors.primary }} onPress={reset}></PreferenceItem>
}

export const MainView = () => {
  return (
    <ScreenView style={{ marginTop: 12 }}>
      <List.Section style={{ flex: 1 }}>
        <List.Subheader>プレビュー</List.Subheader>
        <Divider />
        <View style={{ marginVertical: 6, marginHorizontal: 6 }}>
          <PostView post={post} />
        </View>
        <Divider />
      </List.Section>
      <List.Section style={{ flex: 2 }}>
        <List.Subheader>設定</List.Subheader>
        <Divider />
        <PostFontSizeItem />
        <AppViaEnabledItem />
        <ResetItem />
      </List.Section>
    </ScreenView>
  )
}
