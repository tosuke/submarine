import React, { useCallback } from 'react'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useAuthBloc } from '../../hooks/useAuthBloc'
import { useNaviagtion } from '../../hooks/useNavigation'
import { useValueObservable } from '../../hooks/useObservable'
import { useObservableEffect } from '../../hooks/useObservableEffect'
import { AuthorizeWithCodeScreenView } from '../templates/AuthorizeWithCodeScreenView'

const AuthorizeWithCodeScreenImpl: React.FC = () => {
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

  return (
    <AuthorizeWithCodeScreenView
      authorizing={authorizing}
      authorize={authorize}
      invalidCodeErrorEvent={authBloc.invalidCodeError$}
    />
  )
}

export const AuthorizeWithCodeScreen = withNavigationOptions({
  title: 'コード認証',
})(AuthorizeWithCodeScreenImpl)
