import React from 'react'
import styled from 'styled-components/native'
import { TextInput, TextInputProps } from '../../design/TextInput'

const PostTextInputAtom = styled(TextInput)`
  margin-horizontal: 10;
  margin-top: 5;
  font-size: 18;
`

export const PostTextInput: React.FC<Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'editable' | 'inputAccessoryViewID'
>> = props => <PostTextInputAtom placeholder="What's up Otaku?" multiline autoFocus {...props} />
