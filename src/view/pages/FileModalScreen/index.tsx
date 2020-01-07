import React, { useCallback } from 'react'
import { MainView } from './MainView'
import { AppPropsList } from '../../navigators/App'
import { useNavigationOptions } from '../../../hooks/useNavigationOptions'
import { TransitionPresets } from '@react-navigation/stack/src'

export const FileModalScreen = ({ navigation, route }: AppPropsList['FileModal']) => {
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
