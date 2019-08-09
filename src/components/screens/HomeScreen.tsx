import React, { useCallback } from 'react'
import { Appbar } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { PublicTimeline } from '../containers/PublicTimeline'
import { PublicTimelineBlocProvider } from '../hooks/usePublicTimelineBloc'
import { MaterialIcons } from '@expo/vector-icons'
import { PrimaryFAB } from '../atoms/PrimaryFAB'
import { useNaviagtion } from '../hooks/useNavigation'
import { View } from 'react-native'

export const HomeScreen: React.FC = () => {
  const { navigate } = useNaviagtion()
  const onPostButtonPressed = useCallback(() => {
    navigate('PostModal')
  }, [navigate])
  return (
    <PublicTimelineBlocProvider firstLoad={20}>
      <ScreenView>
        <Appbar.Header>
          <Appbar.Content title="ホーム" />
        </Appbar.Header>
        <PrimaryFAB icon="send" onPress={onPostButtonPressed} />
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <PublicTimeline />
        </View>
      </ScreenView>
    </PublicTimelineBlocProvider>
  )
}
