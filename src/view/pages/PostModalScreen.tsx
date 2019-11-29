import React, { useCallback, useState } from 'react'
import { PostModalScreenView, PostModalScreenHeaderView } from '../templates/PostModalScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useNaviagtion } from '../../hooks/useNavigation'
import { usePostSendBloc } from '../../hooks/usePostSendBloc'
import { useObservableEffect } from '../../hooks/useObservableEffect'

const PostModalScreenImpl: React.FC = () => {
  const { navigate } = useNaviagtion()

  const postSendBloc = usePostSendBloc()
  const [text, updateText] = useState('')
  const onSendButtonPress = useCallback(() => {
    postSendBloc.send$.next(text)
    updateText('')
  }, [text])
  const sendButtonIsDisabled = text.length === 0

  useObservableEffect(
    () => postSendBloc.sendComplete$,
    () => {
      navigate('Main')
    },
    [postSendBloc],
  )

  return (
    <PostModalScreenView
      text={text}
      onChangeText={updateText}
      sendButtonIsDisabled={sendButtonIsDisabled}
      onSendButtonPress={onSendButtonPress}
      emptyTextError$={postSendBloc.emptyTextError$}
    />
  )
}

const PostModalScreenHeader: React.FC = () => {
  const { navigate } = useNaviagtion()
  const onCloseButtonPress = useCallback(() => {
    navigate('Main')
  }, [navigate])
  return <PostModalScreenHeaderView onCloseButtonPress={onCloseButtonPress} />
}

export const PostModalScreen = withNavigationOptions({
  header: <PostModalScreenHeader />,
})(PostModalScreenImpl)
