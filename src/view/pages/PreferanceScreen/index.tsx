import React, { useMemo } from 'react'
import { useNaviagtion, useAuthBloc } from '../../../hooks/inject'
import { Preference, PreferenceContext } from './PreferenceContext'
import { MainView } from './View'

export const PreferenceScreen: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const preference = useMemo<Preference>(
    () => ({
      logout: () => {
        authBloc.signOut$.next()
        navigate('Auth')
      },
    }),
    [authBloc, navigate],
  )

  return (
    <PreferenceContext.Provider value={preference}>
      <MainView />
    </PreferenceContext.Provider>
  )
}
