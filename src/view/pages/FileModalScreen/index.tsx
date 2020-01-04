import React, { useCallback, useEffect } from 'react'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useNaviagtion } from '../../../hooks/inject'
import { File } from '../../../models'
import { MainView } from './MainView'
import { MainPropsList } from '../../navigators/Main'

export const FileModalScreen = ({ navigation, route }: MainPropsList['FileModal']) => {
  const { files, index } = route.params

  const onBackButtonPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return <MainView files={files} initialIndex={index} onBackButtonPress={onBackButtonPress} />
}

/*export const FileModalScreen = withNavigationOptions({
  header: null,
})(Screen)*/
