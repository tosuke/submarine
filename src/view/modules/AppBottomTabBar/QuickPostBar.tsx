import React, { useState, useCallback, useRef } from 'react'
import { StyleProp, ViewStyle, View, TextInput as NativeTextInput } from 'react-native'
import { useTheme, IconButton } from 'react-native-paper'
import { TextInput, captionColor } from '../../design'
import { usePostSendBloc } from '../../../hooks/inject'

const useQuickPostBar = ({ textInputRef }: { textInputRef: React.RefObject<NativeTextInput> }) => {
  const postSendBloc = usePostSendBloc()
  const [draft, setDraft] = useState('')
  const sendable = draft.length !== 0
  const send = useCallback(() => {
    if (!sendable) return
    postSendBloc.send$.next(draft)
    setDraft('')
    if (textInputRef.current != null) {
      textInputRef.current.blur()
    }
  }, [draft, sendable, textInputRef, postSendBloc])

  return {
    draft,
    setDraft,
    sendable,
    send,
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
  const { draft, setDraft, sendable, send } = useQuickPostBar({ textInputRef })

  const buttonColor = sendable ? theme.colors.primary : theme.colors.disabled

  return (
    <View style={[wrapperStyle, style]}>
      <TextInput
        ref={textInputRef}
        style={textInputStyle}
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
