import React from 'react'
import App from './storybook'
import { SafeAreaView, StatusBar } from 'react-native'

export default () => (
  <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
    <App />
  </SafeAreaView>
)
