import React, { useCallback } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Appbar, Text, List, Button, Title, Divider } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '../hooks/useTheme'
import { useAuthBloc } from '../hooks/useAuthBloc'
import { useNaviagtion } from '../hooks/useNavigation'

const PreferencesScreenImpl: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()

  const theme = useTheme()

  const onLogoutButtonPressed = useCallback(() => {
    Alert.alert('ログアウト', '本当にログアウトしますか？', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウトする',
        onPress: () => {
          authBloc.signOut$.next()
          navigate('Auth')
        },
      },
    ])
  }, [authBloc])

  return (
    <ScreenView>
      <ScrollView>
        <List.Section title="アカウント">
          <Divider />
          <List.Item title="名前" description="今: :q!" />
          <Divider />
          <List.Item title="ログアウト" titleStyle={{ color: theme.colors.error }} onPress={onLogoutButtonPressed} />
          <Divider />
        </List.Section>
      </ScrollView>
    </ScreenView>
  )
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
