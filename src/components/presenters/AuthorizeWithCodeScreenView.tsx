import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Clipboard } from 'react-native'
import { Title, Caption, Divider, TextInput, Button, Text } from 'react-native-paper'
import { ScreenView } from '../atoms/ScreenView'

export const AuthorizeWithCodeScreenView: React.FC<{
  authorizing: boolean
  authorize: (code: string) => void
}> = ({ authorizing, authorize }) => {
  const [codeInput, updateCodeInput] = useState('')

  const onAuthorizeButtonPressed = useCallback(() => {
    authorize(codeInput)
  }, [authorize, codeInput])

  useEffect(() => {
    Clipboard.getString().then(str => {
      if(/^[0-9a-f]{16}$/.test(str)) {
        authorize(str)        
      }
    })
  }, [authorize])

  return (
    <ScreenView style={styles.view}>
      <Title>コードで認証</Title>
      <Caption>認証画面でコードを貼り付けるように指示が出たらこの下に貼り付け、ボタンを押してください。</Caption>
      <Divider style={styles.divider} />
      <TextInput
        style={styles.textInput}
        placeholder="code"
        value={codeInput}
        onChangeText={updateCodeInput}
      />
      <Button
        mode="contained"
        loading={authorizing}
        disabled={authorizing || codeInput.length === 0}
        onPress={onAuthorizeButtonPressed}
      >
        <Text>認証する</Text>
      </Button>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 5
  },
  textInput: {
    width: '100%',
    marginBottom: 5 
  }
})
