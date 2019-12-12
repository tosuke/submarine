import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { ScreenView } from '../../design/ScreenView'
import { Title, Caption, Text, Divider, Button } from 'react-native-paper'
import { styles } from './styles'

export const MainView: React.FC<{
  serverName: string
  onAuthorizeButtonPressed: () => void
  onSignInToSeaButtonPressed: () => void
}> = ({ serverName, onAuthorizeButtonPressed, onSignInToSeaButtonPressed }) => {
  const theme = useTheme()

  return (
    <ScreenView style={styles.view}>
      <Title>{serverName}で認証します。</Title>
      <Caption>現在のSeaでは、認証を行う前にログインしている必要があります。</Caption>
      <Divider style={styles.divider} />
      <View style={styles.buttonsView}>
        <Button style={styles.signInToSeaButton} mode="contained" onPress={onSignInToSeaButtonPressed}>
          <Text>Seaにログイン</Text>
        </Button>
        <Button
          style={styles.authButton}
          mode="contained"
          color={theme.colors.accent}
          onPress={onAuthorizeButtonPressed}
        >
          <Text>Seaで認証する</Text>
        </Button>
      </View>
    </ScreenView>
  )
}
