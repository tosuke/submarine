import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import styled from 'styled-components/native'
import { ScreenView } from '../../../design'
import { PostView } from '.'
import { Post, User, File, Application } from '../../../../models'

const Wrapper = styled(ScreenView)`
  flex: 1;
  justify-content: center;
  padding-horizontal: 12;
`

const testText = '@otofune Yo! :smile: https://github.com/ http://[fe80::a1b3:125d:c1f8:4780]/ @ @test'

const thumbnailFile = (id: number, type: string, uri: string) =>
  new File(id, uri, type, [
    {
      id: 0,
      score: 0,
      extension: 'png',
      type: 'thumbnail',
      size: 0,
      mime: 'image/png',
      url: uri,
    },
  ])

storiesOf('Timeline/Post', module)
  .addDecorator(withKnobs)
  .add('Without Avatar', () => {
    const postText = text('Text', 'Hello!\nこんにちは\n😄👍')
    const userName = text("User's name", 'John Doe✔️')
    const userScreenName = text("User's screen name", 'foobar')
    const appName = text("Application's name", 'Test App')
    const appIsAutomated = boolean('Is Application Bot?', false)
    return (
      <Wrapper>
        <PostView
          post={
            new Post(
              0,
              postText,
              new User(0, userName, userScreenName, 1, new Date(), new Date(), null),
              new Application(0, appName, appIsAutomated),
              new Date(),
              new Date(),
              [],
            )
          }
        />
      </Wrapper>
    )
  })
  .add('With Avatar', () => (
    <Wrapper>
      <PostView
        post={
          new Post(
            0,
            testText,
            new User(
              0,
              'John Doe',
              'foobar',
              100,
              new Date(),
              new Date(),
              thumbnailFile(0, 'image', 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2_x128.png'),
            ),
            new Application(0, 'Test App', false),
            new Date(),
            new Date(),
            [
              thumbnailFile(1, 'image', 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2_x128.png'),
              thumbnailFile(2, 'image', 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v4_x128.png'),
              thumbnailFile(3, 'image', 'https://storage.googleapis.com/static.tosukeapps.tk/zerotwo_v4_x128.png'),
              thumbnailFile(4, 'video', 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2.png'),
              thumbnailFile(5, 'video', 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v4.png'),
              thumbnailFile(6, 'video', 'https://storage.googleapis.com/static.tosukeapps.tk/zerotwo_v4.png'),
            ],
          )
        }
      />
    </Wrapper>
  ))
  .add('With Long Text', () => (
    <Wrapper>
      <PostView
        post={
          new Post(
            0,
            'あ'.repeat(512),
            new User(0, 'John Doe', 'foobar', 100, new Date(), new Date(), null),
            new Application(0, 'test', false),
            new Date(),
            new Date(),
            [],
          )
        }
      />
    </Wrapper>
  ))
