import React from 'react'
import styled from 'styled-components/native'
import { PostBar } from './PostBar'
import { PostTextInput } from './PostTextInput'
import { ViewProps, ViewStyle } from 'react-native'
import { KeyboardAvoidingView } from '../../design'
import { useHeaderHeight } from '@react-navigation/stack/src'

const wrapperStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  bottom: 0,
}

const WrapperView: React.FC<ViewProps> = props => (
  <KeyboardAvoidingView {...props} style={[wrapperStyle, props.style]} keyboardVerticalOffset={useHeaderHeight()} />
)

const InputWrapper = styled.View`
  flex: 1;
`

type Props = {
  text: string
  onChangeText: (text: string) => void
  editable: boolean
  sendable: boolean
  send: () => void
}

export const PostModalScreenView: React.FC<Props> = ({ text, onChangeText, editable, sendable, send }) => {
  return (
    <WrapperView>
      <InputWrapper>
        <PostTextInput value={text} onChangeText={onChangeText} editable={editable} />
      </InputWrapper>
      <PostBar sendable={sendable} send={send} />
    </WrapperView>
  )
}
