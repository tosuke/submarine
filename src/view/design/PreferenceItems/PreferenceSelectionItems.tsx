import React, { useCallback } from 'react'
import { PreferenceItem } from './PreferenceItem'
import { RadioButton } from '../RadioButton'
import { Platform } from 'react-native'

type Entry<S extends string> = Readonly<{
  label: S
  title: string
  description?: string
}>

type ItemProps<S extends string> = Entry<S> & {
  value: S
  onValueChange: (value: S) => void
}

const Item = <S extends string>({ label, title, description, value, onValueChange }: ItemProps<S>) => {
  const onPress = useCallback(() => onValueChange(label), [label, onValueChange])
  const radio = useCallback(
    () => (
      <RadioButton
        value={label}
        status={label === value ? 'checked' : 'unchecked'}
        onPress={() => onValueChange(label)}
      />
    ),
    [label, value, onValueChange],
  )
  return (
    <PreferenceItem
      title={title}
      description={description}
      onPress={onPress}
      left={Platform.OS !== 'ios' ? radio : undefined}
      right={Platform.OS === 'ios' ? radio : undefined}
    />
  )
}

export type PreferenceSectionItemsProps<S extends string> = {
  value: S
  onValueChange?: (value: S) => void
  entries?: readonly Entry<S>[]
}

export const PreferenceSectionItems = <S extends string>({
  value,
  onValueChange = () => {},
  entries = [],
}: PreferenceSectionItemsProps<S>) => {
  return (
    <>
      {entries.map(entry => (
        <Item key={entry.label} {...entry} value={value} onValueChange={onValueChange} />
      ))}
    </>
  )
}
