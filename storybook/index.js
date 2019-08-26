import React from 'react'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'
import { DarkTheme } from 'react-native-paper'
import { ThemeBlocProvider } from '../src/hooks/useThemeBloc'

import './rn-addons'

configure(() => {
  require('../src/components/molecules/Post/story')
  require('../src/components/templates/FileModalScreenView/story')
}, module)

addDecorator(story => <ThemeBlocProvider defaultTheme={DarkTheme}>{story()}</ThemeBlocProvider>)

const StoryBookUIRoot = getStorybookUI({})

AppRegistry.registerComponent('%APP_NAME%', () => StoryBookUIRoot)

export default StoryBookUIRoot
