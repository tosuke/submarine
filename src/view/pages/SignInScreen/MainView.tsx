import React from 'react'
import styled from 'styled-components/native'
import { useTheme } from '../../../hooks/useTheme'
import { ScreenView } from '../../design/ScreenView'
import { Title, Caption, Text, Divider as NativeDivider, Button } from 'react-native-paper'

const ScreenWrapper = styled(ScreenView)`
  flex: 1;
  padding-horizontal: 10;
  justify-content: center;
  align-items: center;
`

const Divider = styled(NativeDivider)`
  margin-vertical: 5;
`

const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`

const SignInButton = styled(Button)`
  flex: 1;
`

const AuthButton = styled(Button)`
  flex: 1;
  margin-left: 10;
`

export const MainView: React.FC<{
  serverName: string
  onAuthorizeButtonPressed: () => void
  onSignInToSeaButtonPressed: () => void
}> = ({ serverName, onAuthorizeButtonPressed, onSignInToSeaButtonPressed }) => {
  const theme = useTheme()

  return (
    <ScreenWrapper>
      <Title>{serverName}で認証します。</Title>
      <Caption>現在のSeaでは、認証を行う前にログインしている必要があります。</Caption>
      <Divider />
      <ButtonsView>
        <SignInButton mode="contained" onPress={onSignInToSeaButtonPressed}>
          <Text>Seaにログイン</Text>
        </SignInButton>
        <AuthButton mode="contained" color={theme.colors.accent} onPress={onAuthorizeButtonPressed}>
          <Text>Seaで認証する</Text>
        </AuthButton>
      </ButtonsView>
    </ScreenWrapper>
  )
}
