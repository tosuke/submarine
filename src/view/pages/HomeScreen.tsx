import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import { ScreenView } from '../design/ScreenView'
import { HomeScreenHeader, HomeScreenFAB, HomeScreenMainView } from '../templates/HomeScreenView'
import { PublicTimeline } from '../organisms/PublicTimeline'
import { PublicTimelineBlocProvider, usePublicTimelineBloc } from '../../hooks/inject/usePublicTimelineBloc'
import { useNaviagtion } from '../../hooks/inject/useNavigation'
import { useObservable } from '../../hooks/useObservable'

const HomeScreenImpl = () => {
  const tlBloc = usePublicTimelineBloc()
  const { navigate } = useNaviagtion()

  const onPostButtonPressed = useCallback(() => {
    navigate('PostModal')
  }, [navigate])

  const scrollToTop = useCallback(() => {
    tlBloc.scrollToTop$.next()
  }, [tlBloc])

  const connected = useObservable(() => tlBloc.connectedToSocket$, false, [tlBloc])

  const HeaderAndFAB = (
    <>
      <HomeScreenHeader onTouchEnd={scrollToTop} connectedToStream={connected} />
      <HomeScreenFAB onPress={onPostButtonPressed} />
    </>
  )

  return (
    <>
      {Platform.OS !== 'android' && HeaderAndFAB}
      <ScreenView>
        {Platform.OS === 'android' && HeaderAndFAB}
        <HomeScreenMainView>
          <PublicTimeline />
        </HomeScreenMainView>
      </ScreenView>
    </>
  )
}

export const HomeScreen: React.FC = () => (
  <PublicTimelineBlocProvider firstLoad={20}>
    <HomeScreenImpl />
  </PublicTimelineBlocProvider>
)
