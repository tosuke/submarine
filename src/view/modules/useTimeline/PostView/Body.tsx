import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native-paper'
import { useTimelineActions } from '../inject'
import parseText from '@linkage-community/bottlemail'
import * as punycode from 'punycode'
import * as pictograph from 'pictograph'
import { useFontSizeStyle } from './styles'

const BodyBoldText = styled(Text)`
  font-weight: bold;
`

const BodyLinkText = styled(Text)`
  color: ${props => props.theme.colors.primary};
`

export const Body: React.FC<{ text: string }> = ({ text }) => {
  const { openUrl } = useTimelineActions()
  const tokens = useMemo(() => parseText(text.trim()), [text])

  const fontSizeStyle = useFontSizeStyle()

  return (
    <Text style={fontSizeStyle}>
      {tokens.map((node, i) => {
        switch (node.kind) {
          case 'Text':
            return node.value
          case 'EmojiName':
            return pictograph.dic[node.value] || node.raw
          case 'Mention':
            return (
              <BodyBoldText key={i} style={fontSizeStyle}>
                @{node.value}
              </BodyBoldText>
            )
          case 'Link':
            try {
              const url = new URL(node.value)
              const onPress = () => openUrl(url.href)
              const originLen = url.origin.length
              const origin = `${url.protocol}//${punycode.toUnicode(url.host)}`
              const rest = decodeURI(node.value.slice(originLen))
              return (
                <BodyLinkText key={i} onPress={onPress} style={fontSizeStyle}>
                  {origin}
                  {rest}
                </BodyLinkText>
              )
            } catch {
              return node.raw
            }
          default:
            const exhaustiveCheckedNode: never = node
            throw new Error(`Invalid Case: ${exhaustiveCheckedNode}`)
        }
      })}
    </Text>
  )
}
