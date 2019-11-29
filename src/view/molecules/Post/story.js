import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import parse from '@linkage-community/bottlemail'
import { ScreenView } from '../../atoms/ScreenView'
import { Post } from '.'

const style = {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: 12,
}

const testText = '@otofune Yo! :smile: https://github.com/ http://[fe80::a1b3:125d:c1f8:4780]/ @ @test'

storiesOf('Post', module)
  .addDecorator(withKnobs)
  .add('without avatar', () => (
    <ScreenView style={style}>
      <Post
        userName={text("User's name", 'John Doe')}
        userScreenName={text("User's screen name", 'foobar')}
        relativeTime={text('Relative Time', '17m')}
        text={text('Text', 'Hello!')}
        tokens={parse(text('Text', 'Hello!'))}
        appName={text("Application's name", 'Test App')}
        appIsAutomated={boolean('Is Application Bot?', false)}
      />
    </ScreenView>
  ))
  .add('with avatar', () => (
    <ScreenView style={style}>
      <Post
        userName="John Doe"
        userScreenName="foobar"
        avatarThumbnailUri="https://static.tosukeapps.tk/iona_v2_x128.png"
        relativeTime="17m"
        tokens={parse(testText)}
        thumbnails={[
          { type: 'image', onPress: () => {}, thumbnailUri: 'https://static.tosukeapps.tk/iona_v2_x128.png' },
          { type: 'image', onPress: () => {}, thumbnailUri: 'https://static.tosukeapps.tk/iona_v4_x128.png' },
          { type: 'image', onPress: () => {}, thumbnailUri: 'https://static.tosukeapps.tk/zerotwo_v4_x128.png' },
          { type: 'video', onPress: () => {}, thumbnailUri: 'https://static.tosukeapps.tk/iona_v2.png' },
          { type: 'video', onPress: () => {}, thumbnailUri: 'https://static.tosukeapps.tk/iona_v4.png' },
          { type: 'video', onPress: () => {}, thumbnailUri: 'https://static.tosukeapps.tk/zerotwo_v4.png' },
        ]}
        appName="Test App"
      />
    </ScreenView>
  ))
