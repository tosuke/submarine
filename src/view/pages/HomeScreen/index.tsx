import React, { useMemo, useEffect, useCallback } from 'react'
import { MainView } from './MainView'
import { useSeaClient } from '../../../hooks/inject'
import { PublicTimelineBloc } from '../../../blocs/publicTimelineBloc'
import { openUrl } from '../../../infra/openUrl'
import { File } from '../../../models'
import { AppPropsList } from '../../navigators/App'

export const HomeScreen = ({ navigation }: AppPropsList['Home']) => {
  const seaClient = useSeaClient()
  const tlBloc = useMemo(() => seaClient && new PublicTimelineBloc(seaClient, 40, 20), [seaClient])
  useEffect(() => () => tlBloc && tlBloc.dispose(), [tlBloc])

  // const { navigate } = useNaviagtion()
  const onPostButtonPress = useCallback(() => {
    navigation.push('PostModal')
  }, [navigation])
  const navigateToFileModal = useCallback(
    (files: File[], index: number) => navigation.push('FileModal', { files, index }),
    [navigation],
  )

  return tlBloc ? (
    <MainView
      timelineBloc={tlBloc}
      onPostButtonPress={onPostButtonPress}
      navigateToFileModal={navigateToFileModal}
      openUrl={openUrl}
    />
  ) : null
}
