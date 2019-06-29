import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useValueObservable } from '../hooks/useObservable'
import { useAuthBloc } from '../hooks/useAuthBloc'
import { useNaviagtion } from '../hooks/useNavigation'

const AuthLoadingScreenImpl: React.FC = () => {
  const authBloc = useAuthBloc()
  const loading = useValueObservable(() => authBloc.loading$)
  const seaClient = useValueObservable(() => authBloc.seaClient$)
  const { navigate } = useNaviagtion()

  useEffect(() => {
    if (!loading) {
      if (seaClient) {
        navigate('App')
      } else {
        navigate('Auth')
      }
    }
  }, [loading, seaClient])

  return (
    <ScreenView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </ScreenView>
  )
}

export const AuthLoadingScreen = withNavigationOptions({
  header: null,
})(AuthLoadingScreenImpl)
