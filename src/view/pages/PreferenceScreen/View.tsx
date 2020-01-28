import React from 'react'
import { ScrollView } from 'react-native'
import { ScreenView } from '../../design'
import { AppSection } from './AppSection'
import { AccountSection } from './AccountSection'

const Wrapper: React.FC = ({ children }) => (
  <ScreenView>
    <ScrollView>{children}</ScrollView>
  </ScreenView>
)

export const MainView = () => (
  <Wrapper>
    <AppSection />
    <AccountSection />
  </Wrapper>
)
