import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native-paper'

const AvatarView = styled.View`
  border-radius: 4;
  width: 32;
  height: 32;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.theme.dark ? '#000' : '#fff')};
`

const AvatarImage = styled.Image`
  border-radius: 4;
  width: 32;
  height: 32;
`

const AvatarText = styled(Text)`
  color: ${props => (props.theme.dark ? '#fff' : '#000')};
  font-size: 16;
  line-height: 32;
`

export const Avatar: React.FC<{ name?: string; thumbnailUri?: string }> = ({ name, thumbnailUri }) => (
  <AvatarView>
    {thumbnailUri ? (
      <AvatarImage source={{ uri: thumbnailUri, width: 32, height: 32 }} />
    ) : (
      <AvatarText>{String.fromCodePoint((name || ' ').codePointAt(0)!)}</AvatarText>
    )}
  </AvatarView>
)
