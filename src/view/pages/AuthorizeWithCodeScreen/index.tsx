import React, { useCallback } from 'react'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useAuthBloc, useNaviagtion } from '../../../hooks/inject'
import { useValueObservable, useObservableEffect } from '../../../hooks/useObservable'
import { MainView } from './MainView'

const Screen = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()
  const authorizing = useValueObservable(() => authBloc.authorizing$)

  useObservableEffect(
    () => authBloc.seaClient$,
    seaClient => {
      if (seaClient) navigate('App')
    },
    [authBloc],
  )

  const authorize = useCallback(
    (code: string) => {
      authBloc.authorizeWithCode$.next(code)
    },
    [authBloc],
  )

  return <MainView authorizing={authorizing} authorize={authorize} invalidCodeErrorEvent={authBloc.invalidCodeError$} />
}

export const AuthorizeWithCodeScreen = withNavigationOptions({
  title: 'コード認証',
})(Screen)
