import React from 'react'
import App from './storybook'
import { View, StatusBar } from 'react-native'

export default () => (
  <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
    <App />
  </View>
)
