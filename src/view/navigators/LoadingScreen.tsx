import React, { useEffect } from 'react'
import { RootPropsList } from './'
import { LoadingView } from '../pages/Loading'
import { useAuthBloc } from '../../hooks/inject'
import { useObservable } from '../../hooks/useObservable'

export const LoadingScreen = ({ navigation }: RootPropsList['Loading']) => {
  const authBloc = useAuthBloc()
  const loading = useObservable(() => authBloc.loading$, true, [authBloc])
  const seaClient = useObservable(() => authBloc.seaClient$, undefined, [authBloc])

  useEffect(() => {
    if (!loading) {
      if (seaClient) {
        navigation.navigate('App')
      } else {
        navigation.navigate('Auth')
      }
    }
  }, [navigation, loading, seaClient])

  return loading ? <LoadingView /> : null
}
