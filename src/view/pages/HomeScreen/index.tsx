import React, { useMemo, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { MainView } from './MainView'
import { useSeaClient } from '../../../hooks/inject'
import { PublicTimelineBloc, TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { openUrl } from '../../../infra/openUrl'
import { File } from '../../../models'
import { MainTabPropsList, useStackNavigation } from '../../navigators/Main'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
import { useObservable } from '../../../hooks/useObservable'

const ConnectionStateIcon = ({ timelineBloc }: { timelineBloc: TimelineBloc }) => {
  const theme = useTheme()
  const connected = useObservable(() => timelineBloc.connectedToSocket$, false, [timelineBloc])
  const color = connected ? theme.colors.primary : theme.colors.disabled
  return <FontAwesome size={24} color={color} name="bolt" />
}

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

  const stackNavigation = useStackNavigation()
  useFocusEffect(() => {
    stackNavigation.setOptions({
      headerTitle: 'ホーム',
      headerLeft: () => null,
      headerRight: () => tlBloc && <ConnectionStateIcon timelineBloc={tlBloc} />,
    })
    return void 0
  })

  return tlBloc ? (
    <MainView
      timelineBloc={tlBloc}
      onPostButtonPress={onPostButtonPress}
      navigateToFileModal={navigateToFileModal}
      openUrl={openUrl}
    />
  ) : null
}
