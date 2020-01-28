import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Divider, List, useTheme } from 'react-native-paper'
import { ScreenView, PreferenceItem, PreferenceSwitchItem, PreferenceSliderItem } from '../../design'
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

const PostFontSizeItem = () => {
  const { postFontSize } = usePreference()
  const update = usePreferenceUpdate()
  const onValueChange = useCallback((value: number) => update(state => ({ ...state, postFontSize: value })), [update])
  return (
    <PreferenceSliderItem
      title="本文の文字サイズ"
      minimumValue={10}
      maximumValue={20}
      step={1}
      value={postFontSize}
      onValueChange={onValueChange}
      formatValue={v => v.toFixed(1)}
    />
  )
}

const PostAvatarSizeItem = () => {
  const { postAvatarSize } = usePreference()
  const update = usePreferenceUpdate()
  const onValueChange = useCallback((value: number) => update(state => ({ ...state, postAvatarSize: value })), [update])
  return (
    <PreferenceSliderItem
      title="アバターの大きさ"
      minimumValue={16}
      maximumValue={64}
      step={1}
      value={postAvatarSize}
      onValueChange={onValueChange}
      formatValue={v => v.toFixed(1)}
    />
  )
}

const AppViaEnabledItem = () => {
  const { appViaEnabled } = usePreference()
  const update = usePreferenceUpdate()
  const onValueChange = useCallback((value: boolean) => update(state => ({ ...state, appViaEnabled: value })), [update])

  return <PreferenceSwitchItem title="アプリのvia表記" value={appViaEnabled} onValueChange={onValueChange} />
}

const ResetItem = () => {
  const theme = useTheme()
  const update = usePreferenceUpdate()
  const reset = useCallback(
    () => update(state => ({ ...state, postFontSize: 15, postAvatarSize: 48, appViaEnabled: true })),
    [update],
  )
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
        <PostAvatarSizeItem />
        <AppViaEnabledItem />
        <ResetItem />
      </List.Section>
    </ScreenView>
  )
}
