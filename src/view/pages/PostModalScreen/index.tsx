import React, { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react'
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

  const goBackCalledRef = useRef<boolean>()
  useLayoutEffect(() => {
    goBackCalledRef.current = false
  })
  const goBack = useCallback(() => {
    if (goBackCalledRef.current !== true) {
      navigation.goBack()
      goBackCalledRef.current = true
    }
  }, [navigation])

  useObservableEffect(
    () => postSendBloc.sendComplete$,
    () => {
      updateText('')
      goBack()
    },
    [postSendBloc],
  )

  const theme = useTheme()
  useNavigationOptions(
    navigation,
    () => ({
      title: '投稿',
      headerLeft: () => <IconButton size={24} color={theme.colors.primary} icon="close" onPress={goBack} />,
    }),
    [goBack],
  )

  const keyboardIsShowRef = useRef<boolean>()
  useEffect(() => {
    if (Platform.OS === 'android') {
      const showSub = Keyboard.addListener('keyboardDidShow', () => {
        keyboardIsShowRef.current = true
      })
      let timeoutHandle: number
      const hideSub = Keyboard.addListener('keyboardDidHide', () => {
        keyboardIsShowRef.current = false
        timeoutHandle = setTimeout(() => {
          if (AppState.currentState === 'active' && navigation.isFocused() && keyboardIsShowRef.current === false) {
            goBack()
          }
        }, 200) as any
      })
      return () => {
        showSub.remove()
        hideSub.remove()
        clearTimeout(timeoutHandle)
      }
    }
    return () => {}
  }, [goBack])

  return (
    <PostModalScreenView text={text} onChangeText={updateText} editable={editable} sendable={sendable} send={send} />
  )
}
