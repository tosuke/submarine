import React from 'react'
import styled, { css } from 'styled-components/native'
import { Caption } from '../../../design'

const FooterView = styled.View`
  flex-direction: row;
`

const FontFragment = css`
  font-size: 12;
  line-height: ${12 * 1.2};
`

const FooterAppNameCaption = styled(Caption)`
  ${FontFragment}
`

const FooterBotCaption = styled(Caption)`
  border-width: 1;
  border-radius: 4;
  margin-left: 2;
  padding-left: 3;
  padding-right: 1;
  ${FontFragment}
`

export const Footer: React.FC<{ appName: string; appIsAutomated: boolean }> = ({ appName, appIsAutomated }) => (
  <FooterView>
    <FooterAppNameCaption>via {appName}</FooterAppNameCaption>
    {appIsAutomated && <FooterBotCaption>Bot</FooterBotCaption>}
  </FooterView>
)