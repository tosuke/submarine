import React, { useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAuthBloc } from '../../../hooks/inject'
import { Preference, PreferenceContext } from './PreferenceContext'
import { MainView } from './View'
import { MainTabPropsList, useStackNavigation } from '../../navigators/Main/defines'

export const PreferenceScreen = ({ navigation }: MainTabPropsList['Preference']) => {
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

  const stackNavigation = useStackNavigation()
  useFocusEffect(
    () =>
      void stackNavigation.setOptions({
        headerTitle: '設定',
        headerLeft: () => null,
        headerRight: () => null,
      }),
  )

  return (
    <PreferenceContext.Provider value={preference}>
      <MainView />
    </PreferenceContext.Provider>
  )
}
