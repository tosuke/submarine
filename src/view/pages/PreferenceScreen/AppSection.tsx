import React, { useState, useEffect } from 'react'
import { List, Divider } from 'react-native-paper'
import { usePreference, usePreferenceUpdate } from '../../../hooks/inject'
import { InteractionManager, LayoutAnimation } from 'react-native'
import { PreferenceSwitchItem, PreferenceNavigationItem } from '../../design'
import { usePreferenceActions } from './PreferenceContext'

const AppViaEnabledItem = () => {
  const { appViaEnabled } = usePreference()
  const [enabled, setEnabled] = useState(appViaEnabled)
  const update = usePreferenceUpdate()

  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() =>
      update(state => ({ ...state, appViaEnabled: enabled })),
    )
    return () => handle.cancel()
  }, [enabled])

  return <PreferenceSwitchItem title="アプリのvia表記" value={enabled} onValueChange={setEnabled} />
}

const QuickPostBarEnabledItem = () => {
  const { quickPostBarEnabled } = usePreference()
  const [enabled, setEnabled] = useState(quickPostBarEnabled)
  const update = usePreferenceUpdate()
  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      update(state => ({ ...state, quickPostBarEnabled: enabled }))
      LayoutAnimation.spring()
    })
    return () => handle.cancel()
  }, [enabled])

  return <PreferenceSwitchItem title="簡易投稿バー" value={enabled} onValueChange={setEnabled} />
}

const ThemeItem = () => {
  const { theme: themeType } = usePreference()
  const { pushToAppThemeScreen } = usePreferenceActions()

  const description =
    themeType === 'follow-system' ? '端末の設定に合わせる' : themeType === 'light' ? 'ライト' : 'ダーク'

  return <PreferenceNavigationItem title="テーマ" description={description} onPress={pushToAppThemeScreen} />
}

export const AppSection: React.FC = () => (
  <List.Section>
    <List.Subheader>アプリ設定</List.Subheader>
    <Divider />
    <AppViaEnabledItem />
    <QuickPostBarEnabledItem />
    <ThemeItem />
  </List.Section>
)
