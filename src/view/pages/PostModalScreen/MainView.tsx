import React from 'react'
import styled from 'styled-components/native'
import { PostBar } from './PostBar'
import { PostTextInput } from './PostTextInput'
import { Platform, View, ViewProps, ViewStyle } from 'react-native'
import { KeyboardAvoidingView } from '../../design'
import { useFloatingHeaderHeight } from '@react-navigation/stack/src'

const wrapperStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  bottom: 0,
}

const WrapperView = Platform.select<React.FC<ViewProps>>({
  default: props => (
    <KeyboardAvoidingView
      {...props}
      style={[wrapperStyle, props.style]}
      keyboardVerticalOffset={useFloatingHeaderHeight()}
    />
  ),
  android: props => <View {...props} style={[wrapperStyle, props.style]} />,
})

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
