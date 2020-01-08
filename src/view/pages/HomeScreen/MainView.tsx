import React from 'react'
import { Platform, StyleSheet, FlatList } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { ScreenView } from '../../design'
import { TimelineBlocContext } from '../../../hooks/inject'
import { useTimeline } from '../../modules/useTimeline'
import { File } from '../../../models'
import { APPBAR_HEIGHT } from '../../constants/header'
import { FAB } from './FAB'
import { Divider } from 'react-native-paper'

export const MainView: React.FC<{
  timelineBloc: TimelineBloc
  onPostButtonPress: () => void
  navigateToFileModal: (files: File[], index: number) => void
  openUrl: (url: string) => void
}> = ({ timelineBloc, onPostButtonPress, navigateToFileModal, openUrl }) => {
  const { flatListRef, flatListProps } = useTimeline({
    timelineBloc,
    navigateToFileModal,
    openUrl,
  })

  return (
    <TimelineBlocContext.Provider value={timelineBloc}>
      {Platform.OS !== 'android' && <FAB onPress={onPostButtonPress} />}
      <ScreenView style={StyleSheet.absoluteFill}>
        {Platform.OS === 'android' && <FAB onPress={onPostButtonPress} />}
        <FlatList
          ref={flatListRef}
          {...flatListProps}
          style={StyleSheet.absoluteFill}
          ListHeaderComponent={Divider}
          ListFooterComponentStyle={{ paddingBottom: APPBAR_HEIGHT }}
        />
      </ScreenView>
    </TimelineBlocContext.Provider>
  )
}
