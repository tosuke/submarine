import { TextStyle } from 'react-native'
import { memoize } from 'lodash-es'
import { usePreference } from '../../../../hooks/inject'

const createFontSizeStyle = memoize(
  (fontSize: number): TextStyle => ({
    fontSize,
    lineHeight: fontSize * 1.2,
  }),
)

export const useFontSizeStyle = (scale: number = 1.0) => {
  const { postFontSize } = usePreference()
  return createFontSizeStyle(postFontSize * scale)
}
