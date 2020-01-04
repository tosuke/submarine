import React from 'react'
import { Appbar } from 'react-native-paper'
import { HeaderProps } from 'react-navigation'
import { AppHeader } from './AppHeader'

export const StackHeader = ({ navigation, scene, scenes }: HeaderProps) => {
  const { title } = scene.descriptor.options
  return (
    <AppHeader>
      {scenes.length > 1 && <Appbar.BackAction onPress={() => void navigation.pop()} />}
      <Appbar.Content title={title} />
    </AppHeader>
  )
}
