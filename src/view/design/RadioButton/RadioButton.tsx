import React from 'react'
import { useTheme, RadioButton as PaperRadioButton } from 'react-native-paper'

export type RadioButtonProps = React.PropTypeOf<typeof PaperRadioButton>

export const RadioButton = React.memo((props: RadioButtonProps) => {
  const theme = useTheme()
  return <PaperRadioButton color={theme.colors.primary} {...props} />
})
