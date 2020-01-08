import React, { useCallback } from 'react'
import { MainView } from './MainView'
import { useNavigationOptions } from '../../../hooks/useNavigationOptions'
import { TransitionPresets } from '@react-navigation/stack/src'
import { RootModalPropsList } from '../../navigators'

export const FileModalScreen = ({ navigation, route }: RootModalPropsList['FileModal']) => {
  const { files, index } = route.params

  const onBackButtonPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  useNavigationOptions(
    navigation,
    () => ({
      headerShown: false,
      ...TransitionPresets.ScaleFromCenterAndroid,
    }),
    [],
  )

  return <MainView files={files} initialIndex={index} onBackButtonPress={onBackButtonPress} />
}
