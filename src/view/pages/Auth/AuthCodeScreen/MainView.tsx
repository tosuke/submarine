import React, { useState, useCallback } from 'react'
import styled from 'styled-components/native'
import { Title, Divider as NativeDivider, Button, Text } from 'react-native-paper'
import { ScreenView, PaperTextInput, KeyboardAvoidingView, Snackbar, useSnackBar, Caption } from '../../../design'
import { Observable } from 'rxjs'
import { useObservableEffect } from '../../../../hooks/useObservable'

const Wrapper = styled(KeyboardAvoidingView)`
  flex: 1;
  padding-horizontal: 10;
  justify-content: center;
  align-items: center;
`

const Divider = styled(NativeDivider)`
  margin-vertical: 5;
`

const CodeTextInput = styled(PaperTextInput)`
  width: 100%;
  margin-bottom: 5;
`

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
      <Wrapper>
        <Snackbar {...invalidCodeErrorBar.snackBarProps}>コードが不正です。</Snackbar>
        <Title>コードで認証</Title>
        <Caption>認証画面でコードを貼り付けるように指示が出たらこの下に貼り付け、ボタンを押してください。</Caption>
        <Divider />
        <CodeTextInput
          placeholder="code"
          disabled={authorizing}
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
      </Wrapper>
    </ScreenView>
  )
}
