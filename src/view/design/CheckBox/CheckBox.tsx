import React, { useCallback } from 'react'
import { Checkbox as PaperCheckBox, useTheme } from 'react-native-paper'
import { captionColor } from '../color'

export type CheckBoxProps = {
  checked?: boolean
  onValueChange?: (value: boolean) => void
  disabled?: boolean
  color?: string
  uncheckedColor?: string
}

export const CheckBox = ({ checked, onValueChange, disabled, color, uncheckedColor }: CheckBoxProps) => {
  const theme = useTheme()
  const onPress = useCallback(() => onValueChange && onValueChange(!checked), [onValueChange, checked])
  return (
    <PaperCheckBox
      status={checked ? 'checked' : 'unchecked'}
      disabled={disabled}
      onPress={onPress}
      color={color || theme.colors.primary}
      uncheckedColor={uncheckedColor || captionColor(theme)}
    />
  )
}
