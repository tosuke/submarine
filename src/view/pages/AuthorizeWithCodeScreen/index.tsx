import React, { useCallback } from 'react'
import { useAuthBloc } from '../../../hooks/inject'
import { useValueObservable, useObservableEffect } from '../../../hooks/useObservable'
import { MainView } from './MainView'
import { AuthPropsList } from '../../navigators/Auth'

export const AuthorizeWithCodeScreen = ({ navigation: { navigate } }: AuthPropsList['AuthorizeWithCode']) => {
  const authBloc = useAuthBloc()
  const authorizing = useValueObservable(() => authBloc.authorizing$)

  useObservableEffect(
    () => authBloc.seaClient$,
    seaClient => {
      if (seaClient) navigate('Main')
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
