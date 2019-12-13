import React, { useMemo, useEffect, useCallback } from 'react'
import { MainView } from './MainView'
import { useSeaClient, useNaviagtion } from '../../../hooks/inject'
import { PublicTimelineBloc } from '../../../blocs/publicTimelineBloc'

export const HomeScreen = () => {
  const seaClient = useSeaClient()
  const tlBloc = useMemo(() => new PublicTimelineBloc(seaClient, 20), [seaClient])
  useEffect(() => () => tlBloc.dispose(), [tlBloc])

  const { navigate } = useNaviagtion()
  const onPostButtonPress = useCallback(() => navigate('PostModal'), [])
  const navigateToFileModal = useCallback((files: File[], index: number) => navigate('FileModal', { files, index }), [])

  return (
    <MainView timelineBloc={tlBloc} onPostButtonPress={onPostButtonPress} navigateToFileModal={navigateToFileModal} />
  )
}
