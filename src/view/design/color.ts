import { Theme } from 'react-native-paper'
import color from 'color'

export function captionColor(theme: Theme): string {
  return color(theme.colors.text)
    .alpha(0.5)
    .rgb()
    .string()
}

export function dividerColor(theme: Theme): string {
  return color(theme.dark ? '#ffffff' : '#000000')
    .alpha(0.12)
    .rgb()
    .string()
}
