import React from 'react'
import { Switch as NativeSwitch, Platform } from 'react-native'
import { useTheme, Switch as PapserSwitch } from 'react-native-paper'

export type SwitchProps = {
  value?: boolean
  onValueChange?: (value: boolean) => void
  disabled?: boolean
}

export const Switch = Platform.select({
  default: (props: SwitchProps) => <NativeSwitch {...props} />,
  android: (props: SwitchProps) => {
    const theme = useTheme()
    return <PapserSwitch {...props} color={theme.colors.primary} />
  },
})
