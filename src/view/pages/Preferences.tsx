import React, { useCallback } from 'react'
import { useNaviagtion, useAuthBloc } from '../../hooks/inject'
import { PreferencesScreenView } from '../templates/PreferenceScreenView'

export const PreferencesScreen: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const doLogout = useCallback(() => {
    authBloc.signOut$.next()
    navigate('Auth')
  }, [authBloc, navigate])

  return <PreferencesScreenView doLogout={doLogout} />
}
