import React, { useCallback, useState, useEffect } from 'react'
import { useTheme, IconButton } from 'react-native-paper'
import { usePostSendBloc } from '../../../hooks/inject'
import { useObservableEffect } from '../../../hooks/useObservable'
import { PostModalScreenView } from './MainView'
import { AppPropsList } from '../../navigators/App'
import { useNavigationOptions } from '../../../hooks/useNavigationOptions'

export const PostModalScreen = ({ navigation }: AppPropsList['PostModal']) => {
  const theme = useTheme()
  useNavigationOptions(
    navigation,
    () => ({
      title: '投稿',
      headerLeft: () => (
        <IconButton size={24} color={theme.colors.primary} icon="close" onPress={() => navigation.goBack()} />
      ),
    }),
    [theme],
  )

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
