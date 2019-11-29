import React, { useState } from 'react'
import { storiesOf } from '@storybook/react-native'
import { PostModalScreenView, PostModalScreenHeaderView } from '.'

const Screen = () => {
  const [text, setText] = useState()

  const disabled = text === ''

  return (
    <PostModalScreenView
      text={text}
      onChangeText={setText}
      sendButtonIsDisabled={disabled}
      onSendButtonPress={() => {}}
    />
  )
}

storiesOf('PostModalScreenView', module).add('modal', () => <Screen />)
