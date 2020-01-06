import React, { useCallback } from 'react'
import { MainView } from './MainView'
import { MainPropsList } from '../../navigators/Main'

export const FileModalScreen = ({ navigation, route }: MainPropsList['FileModal']) => {
  const { files, index } = route.params

  const onBackButtonPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return <MainView files={files} initialIndex={index} onBackButtonPress={onBackButtonPress} />
}
