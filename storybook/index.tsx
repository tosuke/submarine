import React from 'react'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'
import { DarkTheme } from 'react-native-paper'
import { ThemeBlocProvider } from '../src/hooks/inject'

const storyLoader: any = require('./storyLoader')

import './rn-addons'

configure(() => {
  storyLoader.loadStories()
}, module)

addDecorator(story => <ThemeBlocProvider defaultTheme={DarkTheme}>{story()}</ThemeBlocProvider>)

const StoryBookUIRoot = getStorybookUI({})

AppRegistry.registerComponent('%APP_NAME%', () => StoryBookUIRoot)

export default StoryBookUIRoot
