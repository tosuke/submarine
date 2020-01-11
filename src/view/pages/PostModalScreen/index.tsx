import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Platform, Keyboard, AppState } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import { usePostSendBloc } from '../../../hooks/inject'
import { useObservableEffect } from '../../../hooks/useObservable'
import { PostModalScreenView } from './MainView'
import { RootModalPropsList } from '../../navigators'
import { useNavigationOptions } from '../../../hooks/useNavigationOptions'

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

  const theme = useTheme()
  useNavigationOptions(
    navigation,
    () => ({
      title: '投稿',
      headerLeft: () => <IconButton size={24} color={theme.colors.primary} icon="close" onPress={navigation.goBack} />,
    }),
    [],
  )

  const keyboardIsShowRef = useRef<boolean>()
  useEffect(() => {
    if (Platform.OS === 'android') {
      const showSub = Keyboard.addListener('keyboardDidShow', () => {
        keyboardIsShowRef.current = true
      })
      const hideSub = Keyboard.addListener('keyboardDidHide', () => {
        keyboardIsShowRef.current = false
        setTimeout(() => {
          if (AppState.currentState === 'active' && navigation.isFocused() && keyboardIsShowRef.current === false) {
            navigation.goBack()
          }
        }, 200)
      })
      return () => {
        showSub.remove()
        hideSub.remove()
      }
    }
    return () => {}
  })

  return (
    <PostModalScreenView text={text} onChangeText={updateText} editable={editable} sendable={sendable} send={send} />
  )
}
