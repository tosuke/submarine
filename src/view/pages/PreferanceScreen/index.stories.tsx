import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { MainView } from './View'

const Simple = () => <MainView />

storiesOf('PreferenceScreen', module).add('Simple', () => <Simple />)
