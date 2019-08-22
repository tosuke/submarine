import React, { useCallback, useMemo } from 'react'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useAuthBloc } from '../../hooks/useAuthBloc'
import { useNaviagtion } from '../../hooks/useNavigation'
import { endpoint } from '../../config'
import { SignInScreenView } from '../templates/SignInScreenView'

const SignInScreenImpl: React.FC = () => {
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
    <SignInScreenView
      serverName={serverName}
      onAuthorizeButtonPressed={onAuthorizeButtonClicked}
      onSignInToSeaButtonPressed={onSignInButtonClicked}
    />
  )
}

export const SignInScreen = withNavigationOptions({
  title: 'ログイン',
})(SignInScreenImpl)
