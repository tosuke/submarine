import React, { useMemo, useEffect, useCallback } from 'react'
import { MainView } from './MainView'
import { useSeaClient } from '../../../hooks/inject'
import { PublicTimelineBloc } from '../../../blocs/publicTimelineBloc'
import { openUrl } from '../../../infra/openUrl'
import { File } from '../../../models'
import { MainTabPropsList } from '../../navigators/Main'

export const HomeScreen = ({ navigation }: MainTabPropsList['Home']) => {
  const seaClient = useSeaClient()
  const tlBloc = useMemo(() => seaClient && new PublicTimelineBloc(seaClient, 40, 20), [seaClient])
  useEffect(() => () => tlBloc && tlBloc.dispose(), [tlBloc])

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
