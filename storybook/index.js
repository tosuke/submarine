import { AppRegistry } from 'react-native'
import { getStorybookUI, configure } from '@storybook/react-native'

import './rn-addons'

configure(() => {
  require('./stories')
}, module)

const StoryBookUIRoot = getStorybookUI({})

AppRegistry.registerComponent('%APP_NAME%', () => StoryBookUIRoot)

export default StoryBookUIRoot
