import React, { useCallback } from 'react'
import { ScrollView, Alert } from 'react-native'
import { useTheme, List, Divider } from 'react-native-paper'
import { ScreenView } from '../../design/ScreenView'
import { usePreference } from './PreferenceContext'

const Wrapper: React.FC = ({ children }) => (
  <ScreenView>
    <ScrollView>{children}</ScrollView>
  </ScreenView>
)

const AccountSection: React.FC = ({ children }) => (
  <List.Section>
    <List.Subheader>アカウント</List.Subheader>
    {children}
  </List.Section>
)

const NameItem = () => <List.Item title="名前" description="今: :q!" />

const LogoutItem = () => {
  const theme = useTheme()
  const { logout } = usePreference()

  const onLogoutButtonPressed = useCallback(() => {
    Alert.alert('ログアウト', '本当にログアウトしますか？', [
      {
        text: 'ログアウトしない',
        style: 'cancel',
      },
      {
        text: 'ログアウトする',
        onPress: logout,
      },
    ])
  }, [logout])

  return <List.Item title="ログアウト" titleStyle={{ color: theme.colors.error }} onPress={onLogoutButtonPressed} />
}

export const MainView = () => (
  <Wrapper>
    <AccountSection>
      <Divider />
      <NameItem />
      <Divider />
      <LogoutItem />
    </AccountSection>
  </Wrapper>
)
