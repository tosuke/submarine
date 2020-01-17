import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps, TextStyle } from 'react-native'
import { TextInput as NativePaperTextInput, useTheme } from 'react-native-paper'

export type TextInputProps = NativeTextInputProps

export const TextInput = forwardRef(
  (
    {
      Component = NativeTextInput,
      ...rest
    }: TextInputProps & { Component?: React.ComponentType<TextInputProps & React.RefAttributes<NativeTextInput>> },
    ref: React.Ref<NativeTextInput>,
  ) => {
    const theme = useTheme()
    const textInputStyle: TextStyle = { color: theme.colors.text }
    const placeholderTextColor = rest.placeholderTextColor || theme.colors.text
    const keyboardAppearance = rest.keyboardAppearance || (theme.dark ? 'dark' : 'default')

    // https://github.com/facebook/react-native/issues/20887
    const textInputRef = useRef<NativeTextInput>(null)
    useImperativeHandle(ref, () => textInputRef.current!, [textInputRef])

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
      <Component
        {...rest}
        autoFocus={false}
        ref={textInputRef}
        editable={editable}
        style={[textInputStyle, rest.style]}
        keyboardAppearance={keyboardAppearance}
        placeholderTextColor={placeholderTextColor}
      />
    )
  },
)

export type PaperTextInputProps = React.PropTypeOf<typeof NativePaperTextInput>
export const PaperTextInput = (props: PaperTextInputProps) => {
  return <NativePaperTextInput {...props} render={props => <TextInput {...props} />} />
}
