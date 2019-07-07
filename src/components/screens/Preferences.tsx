import React, { useCallback } from 'react'
import { Appbar } from 'react-native-paper'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuthBloc } from '../hooks/useAuthBloc'
import { useNaviagtion } from '../hooks/useNavigation'
import { PreferencesScreenView } from '../presenters/PreferenceScreenView'

const PreferencesScreenImpl: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const doLogout = useCallback(() => {
    authBloc.signOut$.next()
    navigate('Auth')
  }, [authBloc, navigate])

  return <PreferencesScreenView doLogout={doLogout} />
}

const PreferencesScreenHeader: React.FC = () => (
  <Appbar.Header>
    <Appbar.Content title="設定" />
  </Appbar.Header>
)

export const PreferencesScreen = withNavigationOptions({
  header: <PreferencesScreenHeader />,
  tabBarLabel: '設定',
  tabBarIcon: ({ tintColor }) => <MaterialIcons name="settings" size={32} color={tintColor} />,
})(PreferencesScreenImpl)
