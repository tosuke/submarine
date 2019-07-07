import React from 'react'
import { Appbar } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { PublicTimeline } from '../containers/PublicTimeline'
import { PublicTimelineBlocProvider } from '../hooks/usePublicTimelineBloc'
import { MaterialIcons } from '@expo/vector-icons'

const HomeScreenImpl: React.FC = () => {
  return (
    <PublicTimelineBlocProvider firstLoad={20}>
      <ScreenView style={{ paddingHorizontal: 5 }}>
        <PublicTimeline />
      </ScreenView>
    </PublicTimelineBlocProvider>
  )
}

const HomeScreenHeader: React.FC = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="ホーム" />
    </Appbar.Header>
  )
}

export const HomeScreen = withNavigationOptions({
  header: <HomeScreenHeader />,
  tabBarLabel: 'ホーム',
  tabBarIcon: ({ tintColor }) => <MaterialIcons name="home" size={32} color={tintColor} />,
})(HomeScreenImpl)
