import React from 'react'
import { Platform, ScrollView, InputAccessoryView } from 'react-native'
import styled from 'styled-components/native'
import { ScreenView, KeyboardAvoidingView } from '../../design'
import { HEADER_HEIGHT } from '../../constants/header'
import { PostBar } from './PostBar'
import { PostTextInput } from './PostTextInput'

const ScreenWrapper = styled(ScreenView)`
  flex: 1;
  justify-content: space-between;
`

const KeyboardAvoidingWrapper = styled(KeyboardAvoidingView)`
  flex: 1;
`

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
  if (Platform.OS !== 'ios') {
    const keyboardVerticalOffset = HEADER_HEIGHT
    return (
      <ScreenWrapper>
        <KeyboardAvoidingWrapper keyboardVerticalOffset={keyboardVerticalOffset}>
          <InputWrapper>
            <PostTextInput value={text} onChangeText={onChangeText} editable={editable}></PostTextInput>
          </InputWrapper>
          <PostBar sendable={sendable} send={send} />
        </KeyboardAvoidingWrapper>
      </ScreenWrapper>
    )
  } else {
    const inputAccessoryID = 'post'
    return (
      <ScreenWrapper>
        <ScrollView keyboardDismissMode="interactive" bounces={false}>
          <PostTextInput
            inputAccessoryViewID={inputAccessoryID}
            value={text}
            onChangeText={onChangeText}
            editable={editable}
          />
        </ScrollView>
        <InputAccessoryView nativeID={inputAccessoryID}>
          <PostBar sendable={sendable} send={send} />
        </InputAccessoryView>
      </ScreenWrapper>
    )
  }
}
