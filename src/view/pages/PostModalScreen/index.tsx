import React, { useCallback, useState, useEffect } from 'react'
import { useTheme, IconButton } from 'react-native-paper'
import { usePostSendBloc } from '../../../hooks/inject'
import { useObservableEffect } from '../../../hooks/useObservable'
import { PostModalScreenView } from './MainView'
import { MainPropsList } from '../../navigators/Main'

export const PostModalScreen = ({ navigation }: MainPropsList['PostModal']) => {
  const theme = useTheme()
  useEffect(() => {
    navigation.setOptions({
      title: '投稿',
      headerLeft: () => (
        <IconButton size={24} color={theme.colors.primary} icon="close" onPress={() => navigation.goBack()} />
      ),
    })
  }, [navigation, theme])

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
    <PostModalScreenView text={text} onChangeText={updateText} editable={editable} sendable={sendable} send={send} />
  )
}
