import React from 'react'
import { TextProps, TextStyle } from 'react-native'
import { Text, Theme, withTheme } from 'react-native-paper'
import color from 'color'

const CaptionImpl: React.FC<TextProps & { theme: Theme }> = ({ children, theme, style, ...props }) => {
  const captionColor = color(theme.colors.text)
    .alpha(0.5)
    .rgb()
    .string()
  const captionStyle: TextStyle = {
    color: captionColor,
    borderColor: captionColor,
  }
  return (
    <Text style={[style, captionStyle]} {...props}>
      {children}
    </Text>
  )
}

export const Caption = withTheme(CaptionImpl)
