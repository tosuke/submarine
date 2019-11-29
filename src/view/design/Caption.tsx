import React from 'react'
import { TextProps, TextStyle } from 'react-native'
import { Text, Theme, withTheme } from 'react-native-paper'
import { captionColor } from './color'

const CaptionImpl: React.FC<TextProps & { theme: Theme }> = ({ children, theme, style, ...props }) => {
  const cc = captionColor(theme)
  const captionStyle: TextStyle = {
    color: cc,
    borderColor: cc,
  }
  return (
    <Text style={[style, captionStyle]} {...props}>
      {children}
    </Text>
  )
}

export const Caption = withTheme(CaptionImpl)
