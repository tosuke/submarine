import React, { useState, useRef, useEffect } from 'react'
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps, Platform, TextStyle } from 'react-native'
import {
  withTheme,
  Theme,
  DeepPartial,
  TextInput as NativePaperTextInput,
  TextInputProps as NativePaperTextInputProps,
} from 'react-native-paper'

export type TextInputProps = NativeTextInputProps & {
  theme?: DeepPartial<Theme>
}

export const TextInput = withTheme(({ theme, ...rest }: TextInputProps & { theme: Theme }) => {
  const textInputStyle: TextStyle = { color: theme.colors.text }
  const placeholderTextColor = rest.placeholderTextColor || theme.colors.text
  const keyboardAppearance = rest.keyboardAppearance || (theme.dark ? 'dark' : 'default')

  // https://github.com/facebook/react-native/issues/20887
  const textInputRef = useRef<NativeTextInput>(null)
  const [editable, setEditable] = useState(rest.editable || true)
  useEffect(() => {
    if (Platform.OS !== 'android') return
    setEditable(!(rest.editable || true))
    const callback = () => {
      if (textInputRef.current == null) {
        setTimeout(callback, 100)
        return
      }
      textInputRef.current.forceUpdate()
      if (rest.autoFocus) textInputRef.current.focus()
    }
    setTimeout(() => {
      setEditable(rest.editable || true)
      callback()
    }, 100)
  }, [rest.editable, rest.autoFocus])

  return (
    <NativeTextInput
      {...rest}
      ref={textInputRef}
      editable={editable}
      style={[textInputStyle, rest.style]}
      keyboardAppearance={keyboardAppearance}
      placeholderTextColor={placeholderTextColor}
    />
  )
})

export type PaperTextInputProps = NativePaperTextInputProps
export const PaperTextInput = (props: PaperTextInputProps) => {
  return <NativePaperTextInput {...props} render={props => <TextInput {...props} />} />
}
