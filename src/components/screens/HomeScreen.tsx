import React, { useCallback } from 'react'
import { Appbar } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { PublicTimeline } from '../containers/PublicTimeline'
import { PublicTimelineBlocProvider, usePublicTimelineBloc } from '../hooks/usePublicTimelineBloc'
import { PrimaryFAB } from '../atoms/PrimaryFAB'
import { useNaviagtion } from '../hooks/useNavigation'
import { View } from 'react-native'

const HomeScreenImpl: React.FC = () => {
  const tlBloc = usePublicTimelineBloc()
  const { navigate } = useNaviagtion()

  const onPostButtonPressed = useCallback(() => {
    navigate('PostModal')
  }, [navigate])

  const scrollToTop = useCallback(() => {
    tlBloc.scrollToTop$.next()
  }, [tlBloc])

  return (
    <ScreenView>
      <Appbar.Header onTouchEnd={scrollToTop}>
        <Appbar.Content title="ホーム" />
      </Appbar.Header>
      <PrimaryFAB icon="send" onPress={onPostButtonPressed} />
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <PublicTimeline />
      </View>
    </ScreenView>
  )
}

export const HomeScreen: React.FC = () => (
  <PublicTimelineBlocProvider firstLoad={20}>
    <HomeScreenImpl />
  </PublicTimelineBlocProvider>
)
