import React, { useCallback } from 'react'
import { useAuthBloc } from '../../hooks/useAuthBloc'
import { useNaviagtion } from '../../hooks/useNavigation'
import { PreferencesScreenView } from '../presenters/PreferenceScreenView'

export const PreferencesScreen: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const doLogout = useCallback(() => {
    authBloc.signOut$.next()
    navigate('Auth')
  }, [authBloc, navigate])

  return <PreferencesScreenView doLogout={doLogout} />
}
