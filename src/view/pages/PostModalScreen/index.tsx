import React, { useCallback, useState } from 'react'
import { usePostSendBloc } from '../../../hooks/inject'
import { useObservableEffect } from '../../../hooks/useObservable'
import { PostModalScreenView } from './MainView'
import { PostModalHeader } from './PostModalHeader'
import { RootModalPropsList } from '../../navigators'

export const PostModalScreen = ({ navigation }: RootModalPropsList['PostModal']) => {
  const postSendBloc = usePostSendBloc()
  const [text, updateText] = useState('')
  const [editable, setEditable] = useState(true)
  const send = useCallback(() => {
    postSendBloc.send$.next(text)
    setEditable(false)
  }, [text])
  const sendable = text.length > 0

  useObservableEffect(
    () => postSendBloc.sendComplete$,
    () => {
      updateText('')
      navigation.goBack()
    },
    [postSendBloc],
  )

  return (
    <>
      <PostModalHeader goBack={navigation.goBack} />
      <PostModalScreenView text={text} onChangeText={updateText} editable={editable} sendable={sendable} send={send} />
    </>
  )
}
