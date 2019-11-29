import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { FileModalScreenView } from '.'
import { File } from '../../../models'

const imageFile1 = new File(1, 'iona_v2.png', 'image', [
  {
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://static.tosukeapps.tk/iona_v2_x128.png',
  },
  {
    extension: 'png',
    type: 'image',
    size: 0,
    mime: 'image/png',
    url: 'https://static.tosukeapps.tk/iona_v2.png',
  },
])

const imageFile2 = new File(2, 'iona_v4.png', 'image', [
  {
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://static.tosukeapps.tk/iona_v4_x128.png',
  },
  {
    extension: 'png',
    type: 'image',
    size: 0,
    mime: 'image/png',
    url: 'https://static.tosukeapps.tk/iona_v4.png',
  },
])

const videoFile = new File(3, 'stack.mp4', 'video', [
  {
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://i.imgur.com/3AHexTe.png',
  },
  {
    type: 'video',
    size: 0,
    mime: 'video/mp4',
    url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
])

storiesOf('FileModalScreenView', module)
  .add('image', () => <FileModalScreenView files={[imageFile1, imageFile2]} initialIndex={1} />)
  .add('video', () => <FileModalScreenView files={[videoFile]} initialIndex={0} />)
