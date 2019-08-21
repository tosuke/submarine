import React, { useMemo } from 'react'
import { ViewStyle } from 'react-native'
import { FAB, FABProps } from 'react-native-paper'
import { useTheme } from '../../hooks/useTheme'

export const PrimaryFAB: React.FC<FABProps> = props => {
  const theme = useTheme()
  const fabStyle = useMemo<ViewStyle>(
    () => ({
      position: 'absolute',
      right: 0,
      bottom: 0,
      margin: 16,
      zIndex: 100,
      backgroundColor: theme.colors.accent,
    }),
    [theme],
  )
  return <FAB style={fabStyle} {...props} />
}
