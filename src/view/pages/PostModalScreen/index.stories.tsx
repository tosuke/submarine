import React, { useState } from 'react'
import { storiesOf } from '@storybook/react-native'
import { PostModalScreenView } from './MainView'

const Old = () => {
  const [text, setText] = useState('')
  return (
    <>
      <PostModalScreenView text={text} onChangeText={setText} editable={true} sendable={true} send={() => {}} />
    </>
  )
}

storiesOf('PostModalScreen', module).add('Old', () => <Old />)
