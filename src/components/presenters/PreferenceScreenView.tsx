import React, { useCallback } from 'react'
import { ScrollView, Alert } from 'react-native'
import { List, Divider, Appbar } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'
import { useTheme } from '../hooks/useTheme'

export const PreferencesScreenView: React.FC<{
  doLogout: () => void
}> = ({ doLogout }) => {
  const theme = useTheme()

  const onLogoutButtonPressed = useCallback(() => {
    Alert.alert('ログアウト', '本当にログアウトしますか？', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウトする',
        onPress: doLogout,
      },
    ])
  }, [doLogout])

  return (
    <ScreenView>
      <Appbar.Header>
        <Appbar.Content title="設定" />
      </Appbar.Header>
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
