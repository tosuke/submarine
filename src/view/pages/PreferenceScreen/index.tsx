import React, { useMemo } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAuthBloc } from '../../../hooks/inject'
import { PreferenceActions, PreferenceActionsContext } from './PreferenceContext'
import { MainView } from './View'
import { MainTabPropsList, useStackNavigation } from '../../navigators/Main/defines'

export const PreferenceScreen = ({ navigation }: MainTabPropsList['Preference']) => {
  const authBloc = useAuthBloc()

  const preference = useMemo<PreferenceActions>(
    () => ({
      logout: () => {
        authBloc.signOut$.next()
        navigation.navigate('AuthRoot')
      },
      pushToAppThemeScreen: () => navigation.push('PreferenceAppTheme'),
      pushToPostViewScreen: () => navigation.push('PreferencePostView'),
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
    <PreferenceActionsContext.Provider value={preference}>
      <MainView />
    </PreferenceActionsContext.Provider>
  )
}
