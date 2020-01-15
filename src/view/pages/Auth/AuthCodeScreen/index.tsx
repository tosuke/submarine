import React, { useCallback } from 'react'
import { useAuthBloc } from '../../../../hooks/inject'
import { useValueObservable, useObservableEffect } from '../../../../hooks/useObservable'
import { MainView } from './MainView'
import { RootStackPropsList } from '../../../navigators'
import { useNavigationOptions } from '../../../../hooks/useNavigationOptions'

export const AuthCodeScreen = ({ navigation }: RootStackPropsList['AuthCode']) => {
  const authBloc = useAuthBloc()
  const authorizing = useValueObservable(() => authBloc.authorizing$)

  useObservableEffect(
    () => authBloc.seaClient$,
    seaClient => {
      if (seaClient) {
        navigation.popToTop()
        navigation.navigate('Main')
      }
    },
    [authBloc],
  )

  const authorize = useCallback(
    (code: string) => {
      authBloc.authorizeWithCode$.next(code)
    },
    [authBloc],
  )

  useNavigationOptions(
    navigation,
    () => ({
      headerTitle: 'コード認証',
    }),
    [],
  )

  return <MainView authorizing={authorizing} authorize={authorize} invalidCodeErrorEvent={authBloc.invalidCodeError$} />
}
