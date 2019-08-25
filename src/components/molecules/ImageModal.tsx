import React, { useState, useEffect } from 'react'
import { Image, Dimensions, ImageStyle } from 'react-native'

export const ImageModal: React.FC<{ style?: ImageStyle; imageUri?: string; thumbnailUri?: string }> = ({
  style,
  imageUri,
  thumbnailUri,
}) => {
  // width / height
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (!thumbnailUri) return
    Image.getSize(thumbnailUri, (w, h) => setAspect(w / h), () => {})
  }, [thumbnailUri])

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
  const screenAspect = screenWidth / screenHeight

  const imageStyle: ImageStyle =
    aspect > screenAspect
      ? {
          width: screenWidth,
          height: screenWidth / aspect,
        }
      : {
          width: screenHeight * aspect,
          height: screenHeight,
        }

  return <Image style={[imageStyle, style]} source={{ uri: imageUri }} />
}
