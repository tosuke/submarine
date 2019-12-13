import React, { useCallback } from 'react'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useNaviagtion } from '../../../hooks/inject'
import { File } from '../../../models'
import { MainView } from './MainView'

const Screen = () => {
  const { getParam, goBack } = useNaviagtion()
  const files: File[] = getParam('files')
  const index: number = getParam('index')

  const onBackButtonPress = useCallback(() => {
    goBack()
  }, [])

  return <MainView files={files} initialIndex={index} onBackButtonPress={onBackButtonPress} />
}

export const FileModalScreen = withNavigationOptions({
  header: null,
})(Screen)
