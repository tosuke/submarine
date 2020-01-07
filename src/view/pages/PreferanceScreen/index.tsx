import React, { useMemo } from 'react'
import { useAuthBloc } from '../../../hooks/inject'
import { Preference, PreferenceContext } from './PreferenceContext'
import { MainView } from './View'
import { AppPropsList } from '../../navigators/App'

export const PreferenceScreen = ({ navigation }: AppPropsList['Preference']) => {
  const authBloc = useAuthBloc()

  const preference = useMemo<Preference>(
    () => ({
      logout: () => {
        authBloc.signOut$.next()
        navigation.navigate('Auth')
      },
    }),
    [authBloc],
  )

  return (
    <PreferenceContext.Provider value={preference}>
      <MainView />
    </PreferenceContext.Provider>
  )
}
