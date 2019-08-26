import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Image, Dimensions, ImageStyle } from 'react-native'
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
const { Value, event, set, cond, eq } = Animated

function useImageSizeStyle(thumbnailUri?: string): ImageStyle {
  // width / height
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (thumbnailUri == null) return
    Image.getSize(thumbnailUri, (w, h) => setAspect(w / h), () => {})
  }, [thumbnailUri])

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
  const screenAspect = screenWidth / screenHeight
  return aspect > screenAspect
    ? {
        width: screenWidth,
        height: screenWidth / aspect,
      }
    : {
        width: screenHeight * aspect,
        height: screenHeight,
      }
}

function usePinchGesture() {
  const scaleRef = useRef(new Value<number>(1))

  const handlePinch = useMemo(
    () =>
      event([
        {
          nativeEvent: ({ scale, state }: { scale: number; state: State }) =>
            cond(eq(state, State.ACTIVE), set(scaleRef.current, scale), set(scaleRef.current, 1)),
        },
      ]),
    [],
  )

  const transformStyle: ImageStyle = {
    transform: [
      {
        scale: scaleRef.current as any,
      },
    ],
  }

  return {
    handlePinch,
    transformStyle,
  }
}

export const ImageModal: React.FC<{ style?: ImageStyle; imageUri?: string; thumbnailUri?: string }> = ({
  style,
  imageUri,
  thumbnailUri,
}) => {
  const imageSizeStyle = useImageSizeStyle(thumbnailUri)

  const { handlePinch, transformStyle } = usePinchGesture()

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

  return (
    <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={handlePinch}>
      <Animated.View
        style={[style, { width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center' }]}
        collapsable={false}
      >
        <Animated.Image style={[imageSizeStyle, transformStyle]} source={{ uri: imageUri }} />
      </Animated.View>
    </PinchGestureHandler>
  )
}
