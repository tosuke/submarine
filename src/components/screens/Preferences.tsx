import React, { useCallback } from 'react'
import { Appbar } from 'react-native-paper'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuthBloc } from '../hooks/useAuthBloc'
import { useNaviagtion } from '../hooks/useNavigation'
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
