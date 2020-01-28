import React from 'react'
import { Platform } from 'react-native'
import { PreferenceItem, PreferenceItemProps } from './PreferenceItem'
import { Switch } from '../Switch'

export type PreferenceSwitchItemProps = PreferenceItemProps & {
  value: boolean
  onValueChange: (value: boolean) => void
}

export const PreferenceSwitchItem = React.memo(({ value, onValueChange, ...rest }: PreferenceSwitchItemProps) => {
  const toggle = () => onValueChange(!value)
  const rightBlock = () => <Switch value={value} onValueChange={onValueChange} />
  return <PreferenceItem right={rightBlock} onPress={Platform.OS !== 'ios' ? toggle : undefined} {...rest} />
})
