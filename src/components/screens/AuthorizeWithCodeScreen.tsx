import React, { useCallback  } from 'react'
import { Alert } from 'react-native'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useAuthBloc } from '../hooks/useAuthBloc'
import { useNaviagtion } from '../hooks/useNavigation'
import { useValueObservable } from '../hooks/useObservable'
import { useObservableEffect } from '../hooks/useObservableEffect'
import { AuthorizeWithCodeScreenView } from '../presenters/AuthorizeWithCodeScreenView'

const AuthorizeWithCodeScreenImpl: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()
  const authorizing = useValueObservable(() => authBloc.authorizing$)

  useObservableEffect(
    () => authBloc.invalidCodeError$,
    () => {
      // うまいことPresenterに移譲したいがうまい方法が思いつかない
      Alert.alert('コードが不正です。', '操作をやり直してください。')
    },
    [authBloc],
  )

  useObservableEffect(
    () => authBloc.seaClient$,
    seaClient => {
      if (seaClient) navigate('App')
    },
    [authBloc],
  )

  const authorize = useCallback((code: string) => {
    authBloc.authorizeWithCode$.next(code)
  }, [authBloc])

  return (
    <AuthorizeWithCodeScreenView
      authorizing={authorizing}
      authorize={authorize}
    />
  )
}

export const AuthorizeWithCodeScreen = withNavigationOptions({
  title: 'コード認証',
})(AuthorizeWithCodeScreenImpl)
