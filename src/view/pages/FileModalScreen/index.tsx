import React, { useCallback } from 'react'
import { MainView } from './MainView'
import { AppPropsList } from '../../navigators/App'

export const FileModalScreen = ({ navigation, route }: AppPropsList['FileModal']) => {
  const { files, index } = route.params

  const onBackButtonPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return <MainView files={files} initialIndex={index} onBackButtonPress={onBackButtonPress} />
}
