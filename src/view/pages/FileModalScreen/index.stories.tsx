import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { MainView } from './MainView'
import { File } from '../../../models'

const imageFile1 = new File(1, 'iona_v2.png', 'image', [
  {
    id: 0,
    score: 0,
    extension: 'png',
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2_x128.png',
  },
  {
    id: 1,
    score: 0,
    extension: 'png',
    type: 'image',
    size: 0,
    mime: 'image/png',
    url: 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2.png',
  },
])

const imageFile2 = new File(2, 'iona_v4.png', 'image', [
  {
    id: 2,
    score: 0,
    extension: 'png',
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v4_x128.png',
  },
  {
    id: 3,
    score: 0,
    extension: 'png',
    type: 'image',
    size: 0,
    mime: 'image/png',
    url: 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v4.png',
  },
])

const videoFile = new File(3, 'stack.mp4', 'video', [
  {
    id: 4,
    score: 0,
    extension: 'png',
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://i.imgur.com/3AHexTe.png',
  },
  {
    id: 5,
    score: 0,
    extension: 'mp4',
    type: 'video',
    size: 0,
    mime: 'video/mp4',
    url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
])

storiesOf('FileModalScreenView', module)
  .add('image', () => <MainView files={[imageFile1, imageFile2]} initialIndex={1} />)
  .add('video', () => <MainView files={[videoFile]} initialIndex={0} />)
