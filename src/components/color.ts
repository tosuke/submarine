import { Theme } from 'react-native-paper'
import color from 'color'

export function captionColor(theme: Theme): string {
  return color(theme.colors.text)
    .alpha(0.5)
    .rgb()
    .string()
}

export function headerColor(theme: Theme): string {
  return color(theme.colors.background)
    .lighten(0.1)
    .mix(color(theme.colors.primary), 0.05)
    .string()
}
