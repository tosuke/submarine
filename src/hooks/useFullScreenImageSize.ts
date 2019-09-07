import { useState, useEffect } from 'react'
import { Image, Dimensions, StatusBar } from 'react-native'

export function useFullScreenImageSize(srcUri: string) {
  const screenInfo = Dimensions.get('screen')
  const screen = {
    width: screenInfo.width,
    height: screenInfo.height - (StatusBar.currentHeight || 0),
  }
  const screenAspectRatio = screen.width / screen.height

  const [aspectRatio, setAspectRatio] = useState(1)

  useEffect(() => {
    Image.getSize(srcUri, (w, h) => setAspectRatio(w / h), e => console.error(e))
  }, [srcUri])

  return aspectRatio > screenAspectRatio
    ? {
        width: screen.width,
        height: screen.width / aspectRatio,
      }
    : {
        width: screen.height * aspectRatio,
        height: screen.height,
      }
}
