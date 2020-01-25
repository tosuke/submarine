import React from 'react'
import styled from 'styled-components/native'
import { Caption } from '../../../design'
import { useFontSizeStyle } from './styles'

const FooterView = styled.View`
  flex-direction: row;
`

const FooterBotCaption = styled(Caption)`
  border-width: 1;
  border-radius: 4;
  margin-left: 2;
  padding-left: 3;
  padding-right: 1;
`

export const Footer: React.FC<{ appName: string; appIsAutomated: boolean }> = ({ appName, appIsAutomated }) => {
  const fontSizeStyle = useFontSizeStyle(0.85)
  return (
    <FooterView style={fontSizeStyle}>
      <Caption style={fontSizeStyle}>via {appName}</Caption>
      {appIsAutomated && <FooterBotCaption style={fontSizeStyle}>Bot</FooterBotCaption>}
    </FooterView>
  )
}
