import React from 'react'
import { Appbar } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { PublicTimeline } from '../containers/PublicTimeline'
import { PublicTimelineBlocProvider } from '../hooks/usePublicTimelineBloc'

const HomeScreenImpl: React.FC = () => {
  return (
    <PublicTimelineBlocProvider firstLoad={20}>
      <ScreenView style={{ paddingHorizontal: 5 }}>
        <PublicTimeline />
      </ScreenView>
    </PublicTimelineBlocProvider>
  )
}

export const HomeScreen = withNavigationOptions({
  header: () => (
    <Appbar.Header>
      <Appbar.Content title="Home" />
    </Appbar.Header>
  ),
})(HomeScreenImpl)
