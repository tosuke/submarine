import React from 'react'
import styled from 'styled-components/native'
import { ScreenView } from '../../design'
import { PostBar } from './PostBar'
import { PostTextInput } from './PostTextInput'

const ScreenWrapper = styled(ScreenView)`
  flex: 1;
  justify-content: space-between;
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
  return (
    <ScreenWrapper>
      <InputWrapper>
        <PostTextInput value={text} onChangeText={onChangeText} editable={editable} />
      </InputWrapper>
      <PostBar sendable={sendable} send={send} />
    </ScreenWrapper>
  )
}
