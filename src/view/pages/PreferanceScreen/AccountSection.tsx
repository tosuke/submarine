import React, { useCallback, useState } from 'react'
import { useTheme, List, Portal, Dialog, Paragraph, Button, Divider } from 'react-native-paper'
import { usePreferenceActions } from './PreferenceContext'
import { PreferenceItem } from '../../design'

const NameItem = () => <PreferenceItem title="名前" description="今: :q!" />

const LogoutItem = () => {
  const theme = useTheme()
  const { logout } = usePreferenceActions()

  const [dialogVisible, setDialogVisible] = useState(false)
  const showDialog = useCallback(() => setDialogVisible(true), [])
  const hideDialog = useCallback(() => setDialogVisible(false), [])

  return (
    <>
      <PreferenceItem title="ログアウト" titleStyle={{ color: theme.colors.error }} onPress={showDialog} />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>ログアウト</Dialog.Title>
          <Dialog.Content>
            <Paragraph>本当にログアウトしますか？</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button uppercase={false} onPress={hideDialog}>
              ログアウトしない
            </Button>
            <Button uppercase={false} onPress={logout} color={theme.colors.error}>
              ログアウトする
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

export const AccountSection = () => (
  <List.Section>
    <List.Subheader>アカウント</List.Subheader>
    <Divider />
    <NameItem />
    <LogoutItem />
  </List.Section>
)
