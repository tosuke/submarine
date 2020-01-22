import React, { useMemo } from 'react'
import { NativeCheckBox } from './NativeCheckBoxAndroid'
import { useTheme } from 'react-native-paper'
import { captionColor } from '../color'
import { CheckBoxProps } from './CheckBox'

export const CheckBox = ({ checked, onValueChange, disabled, color, uncheckedColor }: CheckBoxProps) => {
  const theme = useTheme()
  const tintColors = useMemo(
    () => ({
      true: color || theme.colors.primary,
      false: uncheckedColor || captionColor(theme),
    }),
    [theme, color, uncheckedColor],
  )
  return <NativeCheckBox value={checked} onValueChange={onValueChange} disabled={disabled} tintColors={tintColors} />
}
