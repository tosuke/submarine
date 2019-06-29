import React from 'react'
import { Appbar } from 'react-native-paper'
import { HeaderProps } from 'react-navigation'

export const StackHeader = ({ navigation, scene, scenes }: HeaderProps) => {
  const { title } = scene.descriptor.options
  return (
    <Appbar.Header>
      {scenes.length > 1 && <Appbar.BackAction onPress={() => navigation.pop()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}
