import React, { useCallback, useState } from 'react'
import { PostModalScreenView, Header } from './MainView'
import { withNavigationOptions } from '../../hocs/withNavigationOption'
import { useNaviagtion, usePostSendBloc } from '../../../hooks/inject'
import { useObservableEffect } from '../../../hooks/useObservable'

const PostModalScreenImpl: React.FC = () => {
  const { navigate } = useNaviagtion()

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
      navigate('Main')
    },
    [postSendBloc],
  )

  return (
    <PostModalScreenView text={text} onChangeText={updateText} editable={editable} sendable={sendable} send={send} />
  )
}

const PostModalScreenHeader: React.FC = () => {
  const { navigate } = useNaviagtion()
  const onCloseButtonPress = useCallback(() => {
    navigate('Main')
  }, [navigate])
  return <Header close={onCloseButtonPress} />
}

export const PostModalScreen = withNavigationOptions({
  header: <PostModalScreenHeader />,
})(PostModalScreenImpl)
