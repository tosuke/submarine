import React from 'react'
import { View, ViewProps } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export const ScreenView: React.FC<ViewProps> = ({ ...props }) => {
  const theme = useTheme()
  return (<View {...props} style={[{ backgroundColor: theme.colors.background, height: '100%' }, props.style]} />);
}
