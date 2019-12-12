import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { PreferencesScreenView } from './PreferenceScreenView'

const Simple = () => <PreferencesScreenView doLogout={() => {}} />

storiesOf('PreferenceScreen', module).add('Simple', () => <Simple />)
