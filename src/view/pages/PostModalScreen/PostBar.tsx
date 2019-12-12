import React from 'react'
import styled from 'styled-components/native'
import { Appbar } from 'react-native-paper'
import { headerColor } from '../../design/color'
import { useTheme } from '../../../hooks/useTheme'

const PostBarAtom = styled(Appbar)`
  max-height: 44;
  background-color: ${props => headerColor(props.theme)};
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
