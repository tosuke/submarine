import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { useTheme, Appbar } from 'react-native-paper'
import { dividerColor } from '../../design'

const PostBarAtom = styled(Appbar)`
  max-height: 44;
  background-color: ${props => props.theme.colors.background};
  border-color: ${props => dividerColor(props.theme)};
  border-top-width: ${StyleSheet.hairlineWidth * 2};
`

export const PostBar: React.FC<{ sendable: boolean; send: () => void }> = ({ sendable, send }) => {
  const theme = useTheme()
  const sendButtonColor = sendable ? theme.colors.primary : theme.colors.disabled

  return (
    <PostBarAtom>
      <Appbar.Content title="" />
      <Appbar.Action icon="send" accessibilityHint="Send" disabled={!sendable} color={sendButtonColor} onPress={send} />
    </PostBarAtom>
  )
}
