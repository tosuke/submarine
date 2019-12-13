import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { Appbar } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { PublicTimeline } from '../../organisms/PublicTimeline'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { useObservable } from '../../../hooks/useObservable'
import { ScreenView, AppHeader, PrimaryFAB } from '../../design'
import { PublicTimelineBlocContext } from '../../../hooks/inject'

export const Header: React.FC<{ onTouchEnd?: () => void; connectedToStream?: boolean }> = ({
  onTouchEnd,
  connectedToStream,
}) => (
  <AppHeader style={{ zIndex: 1 }} onTouchEnd={onTouchEnd}>
    <Appbar.Content title="ホーム" />
    <Appbar.Action icon="wifi" disabled={!connectedToStream} />
  </AppHeader>
)

const SendIconAtom = styled(MaterialIcons)`
  padding-left: 3;
`

const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size, color }) => (
  <SendIconAtom name="send" size={size} color={color} />
)

export const FAB: React.FC<{ onPress?: () => void }> = ({ onPress }) => <PrimaryFAB icon={SendIcon} onPress={onPress} />

const TimelineWrapper = styled.View`
  flex: 1;
`
const Timeline: React.FC<{ naviagateToFileModal: (files: File[], index: number) => void }> = ({
  naviagateToFileModal,
}) => (
  <TimelineWrapper>
    <PublicTimeline navigateToFileModal={naviagateToFileModal} />
  </TimelineWrapper>
)

export const MainView: React.FC<{
  timelineBloc: TimelineBloc
  onPostButtonPress: () => void
  navigateToFileModal: (files: File[], index: number) => void
}> = ({ timelineBloc, onPostButtonPress, navigateToFileModal }) => {
  const scrollToTop = useCallback(() => {
    timelineBloc.scrollToTop$.next()
  }, [timelineBloc])

  const connected = useObservable(() => timelineBloc.connectedToSocket$, false, [timelineBloc])

  const HeaderAndFAB = (
    <>
      <Header onTouchEnd={scrollToTop} connectedToStream={connected} />
      <FAB onPress={onPostButtonPress} />
    </>
  )

  return (
    <PublicTimelineBlocContext.Provider value={timelineBloc}>
      {HeaderAndFAB}
      <ScreenView>
        <Timeline naviagateToFileModal={navigateToFileModal} />
      </ScreenView>
    </PublicTimelineBlocContext.Provider>
  )
}
