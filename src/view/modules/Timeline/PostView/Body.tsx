import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native-paper'
import { useTimelineActions } from '../inject'
import parseText from '@linkage-community/bottlemail'
import * as punycode from 'punycode'
import * as pictograph from 'pictograph'

const BodyText = styled(Text)`
  font-size: 13;
  line-height: 17;
`

const BodyBoldText = styled(BodyText)`
  font-weight: bold;
`

const BodyLinkText = styled(BodyText)`
  color: ${props => props.theme.colors.primary};
`

export const Body: React.FC<{ text: string }> = ({ text }) => {
  const { openUrl } = useTimelineActions()
  const tokens = useMemo(() => parseText(text), [text])
  return (
    <BodyText>
      {tokens.map((node, i) => {
        switch (node.kind) {
          case 'Text':
            return node.value
          case 'EmojiName':
            return pictograph.dic[node.value] || node.raw
          case 'Mention':
            return <BodyBoldText key={i}>@{node.value}</BodyBoldText>
          case 'Link':
            try {
              const url = new URL(node.value)
              const onPress = () => openUrl(url.href)
              const originLen = url.origin.length
              const origin = `${url.protocol}//${punycode.toUnicode(url.host)}`
              const rest = decodeURI(node.value.slice(originLen))
              return (
                <BodyLinkText key={i} onPress={onPress}>
                  {origin}
                  {rest}
                </BodyLinkText>
              )
            } catch {
              return node.raw
            }
          default:
            const _exhaustiveCheck: never = node
        }
      })}
    </BodyText>
  )
}
