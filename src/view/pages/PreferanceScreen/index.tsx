import React, { useMemo } from 'react'
import { useAuthBloc } from '../../../hooks/inject'
import { Preference, PreferenceContext } from './PreferenceContext'
import { MainView } from './View'
import { MainPropsList } from '../../navigators/Main'

export const PreferenceScreen = ({ navigation }: MainPropsList['Preference']) => {
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
