import React, { useState, useRef, useEffect } from 'react'
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps, TextStyle } from 'react-native'
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
  const [editable, setEditable] = useState(rest.editable !== false)

  useEffect(() => {
    const initial = rest.editable !== false
    setEditable(!initial)
    const id = setTimeout(() => {
      setEditable(initial)
      if (textInputRef.current && rest.autoFocus) textInputRef.current.focus()
    }, 100)
    return () => {
      setEditable(initial)
      clearTimeout(id)
    }
  }, [rest.editable])

  return (
    <NativeTextInput
      {...rest}
      autoFocus={false}
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
