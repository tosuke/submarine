import React from 'react'
import styled from 'styled-components/native'
import { Divider, Subheading } from 'react-native-paper'

const FooterView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`

export const Footer = () => (
  <>
    <Divider />
    <FooterView>
      <Subheading>Loading...</Subheading>
    </FooterView>
  </>
)
