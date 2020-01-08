import React, { useCallback, useMemo } from 'react'
import { useAuthBloc } from '../../../../hooks/inject'
import { endpoint } from '../../../../config'
import { MainView } from './MainView'
import { RootStackPropsList } from '../../../navigators'
import { useNavigationOptions } from '../../../../hooks/useNavigationOptions'
import { StatusBar } from '../../../design'

export const AuthRootScreen = ({ navigation }: RootStackPropsList['AuthRoot']) => {
  const authBloc = useAuthBloc()

  const serverName = useMemo(() => new URL(endpoint).host, [])

  const onAuthorizeButtonClicked = useCallback(() => {
    authBloc.linkToAuthzURL$.next()
    navigation.push('AuthCode')
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
    <>
      <StatusBar />
      <MainView
        serverName={serverName}
        onAuthorizeButtonPressed={onAuthorizeButtonClicked}
        onSignInToSeaButtonPressed={onSignInButtonClicked}
      />
    </>
  )
}
