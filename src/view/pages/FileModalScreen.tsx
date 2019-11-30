import React, { useCallback } from 'react'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useNaviagtion } from '../../hooks/inject/useNavigation'
import { File } from '../../models'
import { FileModalScreenView } from '../templates/FileModalScreenView'

const FileModalScreenImpl: React.FC = () => {
  const { getParam, goBack } = useNaviagtion()
  const files: File[] = getParam('files')
  const index: number = getParam('index')

  const onBackButtonPress = useCallback(() => {
    goBack()
  }, [])

  return <FileModalScreenView files={files} initialIndex={index} onBackButtonPress={onBackButtonPress} />
}

export const FileModalScreen = withNavigationOptions({
  header: null,
})(FileModalScreenImpl)
