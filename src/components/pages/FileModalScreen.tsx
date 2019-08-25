import React, { useCallback } from 'react'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useNaviagtion } from '../../hooks/useNavigation'
import { ImageFile } from '../../models/file'
import { FilemodalScreenView } from '../templates/FileModalScreenView'

const FileModalScreenImpl: React.FC = () => {
  const { getParam, goBack } = useNaviagtion()
  const file: ImageFile = getParam('file')

  const onBackButtonPress = useCallback(() => {
    goBack()
  }, [])

  return <FilemodalScreenView file={file} onBackButtonPress={onBackButtonPress} />
}

export const FileModalScreen = withNavigationOptions({
  header: null,
})(FileModalScreenImpl)
