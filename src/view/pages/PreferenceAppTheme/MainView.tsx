import React from 'react'
import { List, Divider } from 'react-native-paper'
import { PreferenceSectionItems, ScreenView } from '../../design'
import { PreferenceType } from '../../../hooks/inject'

type ThemeType = PreferenceType['theme']

const entries = [
  {
    label: 'follow-system' as const,
    title: '端末の設定に合わせる',
  },
  {
    label: 'light' as const,
    title: 'ライト',
  },
  {
    label: 'dark' as const,
    title: 'ダーク',
  },
]

export const MainView: React.FC<{ value: ThemeType; onValueChange: (value: ThemeType) => void }> = ({
  value,
  onValueChange,
}) => {
  return (
    <ScreenView>
      <List.Section>
        <List.Subheader>テーマ</List.Subheader>
        <Divider />
        <PreferenceSectionItems value={value} onValueChange={onValueChange} entries={entries} />
      </List.Section>
    </ScreenView>
  )
}
