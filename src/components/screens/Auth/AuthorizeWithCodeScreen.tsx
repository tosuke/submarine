import React, { useCallback, useState, useEffect } from 'react'
import { Clipboard, Alert } from 'react-native'
import { Title, Caption, Divider, TextInput, Button, Text } from 'react-native-paper'
import { ScreenView } from '../../atoms/ScreenView'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useAuthBloc } from '../../hooks/useAuthBloc'
import { useNaviagtion } from '../../hooks/useNavigation'
import { useValueObservable } from '../../hooks/useObservable'
import { useObservableEffect } from '../../hooks/useObservableEffect'

const AuthorizeWithCodeScreenImpl: React.FC = () => {
  const authBloc = useAuthBloc()
  const { navigate } = useNaviagtion()
  const authorizing = useValueObservable(() => authBloc.authorizing$)

  useObservableEffect(() => authBloc.invalidCodeError$, () => {
    Alert.alert('コードが不正です。', '操作をやり直してください。')
  }, [authBloc])

  useObservableEffect(() => authBloc.seaClient$, seaClient => {
    if(seaClient) navigate('App')
  }, [authBloc])

  const [codeInput, updateCodeInput] = useState('')
  const onAuthorizeButtonPressed = useCallback(() => {
    authBloc.authorizeWithCode$.next(codeInput)
  }, [codeInput])

  useEffect(() => {
    Clipboard.getString().then(str => {
      if(/^[0-9a-f]{16}$/.test(str)) {
        updateCodeInput(str)
        authBloc.authorizeWithCode$.next(str)
      }
    })
  }, [authBloc])

  return (
    <ScreenView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
      <Title>コードで認証</Title>
      <Caption>認証画面でコードを貼り付けるように指示が出たらこの下に貼り付け、ボタンを押してください。</Caption>
      <Divider style={{ marginVertical: 5 }} />
      <TextInput
        style={{ width: '100%', marginBottom: 5 }}
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

export const AuthorizeWithCodeScreen = withNavigationOptions({
  title: 'コード認証',
})(AuthorizeWithCodeScreenImpl)
