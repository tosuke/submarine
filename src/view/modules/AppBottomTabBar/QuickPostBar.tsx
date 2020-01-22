import React, { forwardRef, useState, useCallback, useRef, useImperativeHandle } from 'react'
import { StyleProp, ViewStyle, View, TextInput as NativeTextInput, Animated, TextInputProps } from 'react-native'
import { useTheme, IconButton } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import { TextInput, captionColor } from '../../design'
import { usePostSendBloc } from '../../../hooks/inject'
import { useObservableEffect } from '../../../hooks/useObservable'

const AnimatedNativeTextInput = Animated.createAnimatedComponent(NativeTextInput)

const AnimatedTextInput = forwardRef((props: TextInputProps, ref: React.Ref<NativeTextInput>) => {
  const nodeRef = useRef<{ node: NativeTextInput | null }>({ node: null })
  useImperativeHandle(ref, () => nodeRef.current.node!)

  const animatedRefCallback = useCallback(
    (node: { getNode(): NativeTextInput | null } | null) => {
      if (node == null) return
      nodeRef.current.node = node.getNode()
    },
    [nodeRef],
  )

  return <AnimatedNativeTextInput ref={animatedRefCallback} {...props} />
})

const useQuickPostBar = ({ textInputRef }: { textInputRef: React.RefObject<NativeTextInput> }) => {
  const postSendBloc = usePostSendBloc()
  const [draft, setDraft] = useState('')
  const sendable = draft.length !== 0
  const send = useCallback(() => {
    postSendBloc.send$.next(draft)

    setDraft('')
    if (textInputRef.current != null) {
      textInputRef.current.clear()
    }
  }, [draft, sendable, textInputRef, postSendBloc])

  const { current: translateX } = useRef(new Animated.Value(0))
  useObservableEffect(
    () => postSendBloc.emptyTextError$,
    () => {
      Animated.sequence([
        Animated.spring(translateX, {
          toValue: 0.01,
          velocity: 1000,
          delay: 16,
          tension: 600,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start()
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      }, 16)
    },
    [postSendBloc],
  )

  return {
    draft,
    setDraft,
    sendable,
    send,
    translateX,
  }
}

const wrapperStyle: ViewStyle = {
  flexDirection: 'row',
}

const textInputStyle: ViewStyle = {
  flex: 1,
}

export type QuickPostBarProps = {
  style?: StyleProp<ViewStyle>
}

export const QuickPostBar = ({ style }: QuickPostBarProps) => {
  const theme = useTheme()
  const textInputRef = useRef<NativeTextInput>(null)
  const { draft, setDraft, sendable, send, translateX } = useQuickPostBar({ textInputRef })

  const buttonColor = sendable ? theme.colors.primary : theme.colors.disabled

  return (
    <View style={[wrapperStyle, { backgroundColor: theme.colors.surface }, style]}>
      <TextInput
        Component={AnimatedTextInput}
        ref={textInputRef}
        style={[textInputStyle, { transform: [{ translateX: translateX as any }] }]}
        placeholder="What's up Otaku?"
        placeholderTextColor={captionColor(theme)}
        numberOfLines={1}
        returnKeyType="send"
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={send}
      />
      <IconButton icon="send" color={buttonColor} disabled={!sendable} onPress={send} />
    </View>
  )
}
