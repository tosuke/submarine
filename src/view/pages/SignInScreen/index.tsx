import React, { useCallback, useMemo } from 'react'
import { useAuthBloc } from '../../../hooks/inject'
import { endpoint } from '../../../config'
import { MainView } from './MainView'
import { AuthPropsList } from '../../navigators/Auth'
import { useNavigationOptions } from '../../../hooks/useNavigationOptions'

export const SignInScreen = ({ navigation }: AuthPropsList['SignIn']) => {
  const authBloc = useAuthBloc()

  const serverName = useMemo(() => new URL(endpoint).host, [])

  const onAuthorizeButtonClicked = useCallback(() => {
    authBloc.linkToAuthzURL$.next()
    navigation.push('AuthorizeWithCode')
  }, [authBloc])

  const onSignInButtonClicked = useCallback(() => {
    authBloc.linkToSignInURL$.next()
  }, [authBloc])

  useNavigationOptions(
    navigation,
    () => ({
      headerTitle: 'ログイン',
    }),
    [],
  )
  return (
    <MainView
      serverName={serverName}
      onAuthorizeButtonPressed={onAuthorizeButtonClicked}
      onSignInToSeaButtonPressed={onSignInButtonClicked}
    />
  )
}
