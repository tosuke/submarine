import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { MainView } from './MainView'

const Simple = () => (
  <MainView serverName="hoge" onAuthorizeButtonPressed={() => {}} onSignInToSeaButtonPressed={() => {}} />
)

storiesOf('SignInScreen', module).add('Simple', () => <Simple />)
