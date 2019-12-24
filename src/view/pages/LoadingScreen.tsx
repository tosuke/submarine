import React, { useEffect } from 'react'
// import { AppLoading } from 'expo'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useValueObservable } from '../../hooks/useObservable'
import { useAuthBloc, useNaviagtion } from '../../hooks/inject'

const LoadingScreenImpl: React.FC = () => {
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

  return null
}

export const LoadingScreen = withNavigationOptions({
  header: null,
})(LoadingScreenImpl)
