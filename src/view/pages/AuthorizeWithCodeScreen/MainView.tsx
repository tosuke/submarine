import React, { useState, useCallback } from 'react'
import { Header } from 'react-navigation'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Title, Caption, Divider, Button, Text, Snackbar } from 'react-native-paper'
import { ScreenView, PaperTextInput, KeyboardAvoidingView } from '../../design'
import { Observable } from 'rxjs'
import { useObservableEffect } from '../../../hooks/useObservable'
import { useSnackBar } from '../../../hooks/useSnackBar'
import { styles } from './style'

export const MainView: React.FC<{
  authorizing: boolean
  authorize: (code: string) => void
  invalidCodeErrorEvent: Observable<void>
}> = ({ authorizing, authorize, invalidCodeErrorEvent }) => {
  const [codeInput, updateCodeInput] = useState('')

  const onAuthorizeButtonPressed = useCallback(() => {
    authorize(codeInput)
  }, [authorize, codeInput])

  const invalidCodeErrorBar = useSnackBar({
    action: ({ dismiss }) => ({ label: 'OK', onPress: dismiss }),
  })

  useObservableEffect(
    () => invalidCodeErrorEvent,
    () => {
      invalidCodeErrorBar.show()
    },
    [invalidCodeErrorEvent],
  )

  return (
    <ScreenView>
      <KeyboardAvoidingView style={styles.view} keyboardVerticalOffset={Header.HEIGHT + getStatusBarHeight()}>
        <Snackbar
          visible={invalidCodeErrorBar.visible}
          duration={invalidCodeErrorBar.duration}
          onDismiss={invalidCodeErrorBar.dismiss}
          action={invalidCodeErrorBar.action}
        >
          コードが不正です。
        </Snackbar>
        <Title>コードで認証</Title>
        <Caption>認証画面でコードを貼り付けるように指示が出たらこの下に貼り付け、ボタンを押してください。</Caption>
        <Divider style={styles.divider} />
        <PaperTextInput
          style={styles.textInput}
          placeholder="code"
          value={codeInput}
          onChangeText={updateCodeInput}
          onSubmitEditing={onAuthorizeButtonPressed}
        />
        <Button
          mode="contained"
          loading={authorizing}
          disabled={authorizing || codeInput.length === 0}
          onPress={onAuthorizeButtonPressed}
        >
          <Text>認証する</Text>
        </Button>
      </KeyboardAvoidingView>
    </ScreenView>
  )
}
