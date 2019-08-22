import React, { useCallback } from 'react'
import { ScreenView } from '../atoms/ScreenView'
import { HomeScreenHeader, HomeScreenFAB, HomeScreenMainView } from '../templates/HomeScreenView'
import { PublicTimeline } from '../organisms/PublicTimeline'
import { PublicTimelineBlocProvider, usePublicTimelineBloc } from '../../hooks/usePublicTimelineBloc'
import { useNaviagtion } from '../../hooks/useNavigation'
import { useObservable } from '../../hooks/useObservable'

const HomeScreenImpl: React.FC = () => {
  const tlBloc = usePublicTimelineBloc()
  const { navigate } = useNaviagtion()

  const onPostButtonPressed = useCallback(() => {
    navigate('PostModal')
  }, [navigate])

  const scrollToTop = useCallback(() => {
    tlBloc.scrollToTop$.next()
  }, [tlBloc])

  const connected = useObservable(() => tlBloc.connectedToSocket$, false, [tlBloc])

  return (
    <ScreenView>
      <HomeScreenHeader onTouchEnd={scrollToTop} connectedToStream={connected} />
      <HomeScreenFAB onPress={onPostButtonPressed} />
      <HomeScreenMainView>
        <PublicTimeline />
      </HomeScreenMainView>
    </ScreenView>
  )
}

export const HomeScreen: React.FC = () => (
  <PublicTimelineBlocProvider firstLoad={20}>
    <HomeScreenImpl />
  </PublicTimelineBlocProvider>
)
