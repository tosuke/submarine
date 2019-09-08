import { useState, useEffect } from 'react'
import { Image, Dimensions } from 'react-native'

export function useFullScreenImageSize(srcUri: string) {
  const screen = Dimensions.get('window')
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
