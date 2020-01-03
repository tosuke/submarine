import React, { useMemo, useEffect, useCallback } from 'react'
import { MainView } from './MainView'
import { useSeaClient, useNaviagtion } from '../../../hooks/inject'
import { PublicTimelineBloc } from '../../../blocs/publicTimelineBloc'
import { openUrl } from '../../../infra/openUrl'
import { File } from '../../../models'

export const HomeScreen = () => {
  const seaClient = useSeaClient()
  const tlBloc = useMemo(() => seaClient && new PublicTimelineBloc(seaClient, 40, 20), [seaClient])
  useEffect(() => () => tlBloc && tlBloc.dispose(), [tlBloc])

  const { navigate } = useNaviagtion()
  const onPostButtonPress = useCallback(() => navigate('PostModal'), [])
  const navigateToFileModal = useCallback((files: File[], index: number) => navigate('FileModal', { files, index }), [])

  return (
    tlBloc && (
      <MainView
        timelineBloc={tlBloc}
        onPostButtonPress={onPostButtonPress}
        navigateToFileModal={navigateToFileModal}
        openUrl={openUrl}
      />
    )
  )
}
