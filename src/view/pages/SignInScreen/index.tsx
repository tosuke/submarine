import React, { useCallback, useMemo } from 'react'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useNaviagtion, useAuthBloc } from '../../../hooks/inject'
import { endpoint } from '../../../config'
import { MainView } from './MainView'

const Screen: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const serverName = useMemo(() => new URL(endpoint).host, [])

  const onAuthorizeButtonClicked = useCallback(() => {
    authBloc.linkToAuthzURL$.next()
    navigate('AuthorizeWithCode')
  }, [authBloc])

  const onSignInButtonClicked = useCallback(() => {
    authBloc.linkToSignInURL$.next()
  }, [authBloc])

  return (
    <MainView
      serverName={serverName}
      onAuthorizeButtonPressed={onAuthorizeButtonClicked}
      onSignInToSeaButtonPressed={onSignInButtonClicked}
    />
  )
}

export const SignInScreen = withNavigationOptions({
  title: 'ログイン',
})(Screen)
