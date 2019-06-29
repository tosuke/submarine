import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Text, Button, Divider, Title, Caption } from 'react-native-paper'
import { ScreenView } from '../../atoms/ScreenView'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useAuthBloc } from '../../hooks/useAuthBloc'
import { useNaviagtion } from '../../hooks/useNavigation'
import { endpoint } from '../../../config'
import { useTheme } from '../../hooks/useTheme'

const SignInScreenImpl: React.FC = () => {
  const authBloc = useAuthBloc()

  const { navigate } = useNaviagtion()
  const theme = useTheme()

  const onAuthorizeButtonClicked = useCallback(() => {
    authBloc.linkToAuthzURL$.next()
    navigate('AuthorizeWithCode')
  }, [authBloc])
  const onSignInButtonClicked = useCallback(() => {
    authBloc.linkToSignInURL$.next()
  }, [authBloc])

  return (
    <ScreenView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
      <Title>{new URL(endpoint).host}で認証します。</Title>
      <Caption>現在のSeaでは、認証を行う前にログインしている必要があります。</Caption>
      <Divider style={{ marginVertical: 5 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button style={{ flex: 1, marginRight: 10 }} mode="contained" onPress={onSignInButtonClicked}>
          <Text>Seaにログイン</Text>
        </Button>
        <Button style={{ flex: 1 }} mode="contained" color={theme.colors.accent} onPress={onAuthorizeButtonClicked}>
          <Text>Seaで認証する</Text>
        </Button>
      </View>
      <Divider />
    </ScreenView>
  )
}

export const SignInScreen = withNavigationOptions({
  title: 'ログイン',
})(SignInScreenImpl)
