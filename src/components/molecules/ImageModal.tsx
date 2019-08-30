import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Image, Dimensions, ImageStyle } from 'react-native'
import { PinchGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
const {
  Value,
  event,
  block,
  set,
  call,
  cond,
  eq,
  lessOrEq,
  greaterOrEq,
  greaterThan,
  and,
  add,
  sub,
  multiply,
  divide,
} = Animated

function useImageSizeStyle(thumbnailUri?: string) {
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

function first(value: Animated.Adaptable<number>, updating: Animated.Adaptable<0 | 1>): Animated.Node<number> {
  const isFirst = new Value<0 | 1>(1)
  const firstValue = new Value<number>()
  return cond(
    updating,
    cond(isFirst, [set(firstValue, value), set(isFirst, 0), firstValue], firstValue),
    set(isFirst, 1),
  )
}

function pinchDiff(value: Animated.Adaptable<number>, updating: Animated.Adaptable<0 | 1>): Animated.Node<number> {
  const tmp = new Value(0 as number)
  const prev = new Value(1 as number)

  return cond(updating, [set(tmp, divide(value, prev)), set(prev, value), tmp], set(prev, 1))
}

function panDiff(value: Animated.Adaptable<number>, updating: Animated.Adaptable<0 | 1>): Animated.Node<number> {
  const tmp = new Value(0 as number)
  const prev = new Value(0 as number)

  return cond(updating, [set(tmp, sub(value, prev)), set(prev, value), tmp], set(prev, 0))
}

function ranged(
  value: Animated.Adaptable<number>,
  lowerBound: Animated.Adaptable<number>,
  upperBound: Animated.Adaptable<number>,
): Animated.Node<number> {
  return cond(greaterOrEq(value, lowerBound), cond(lessOrEq(value, upperBound), value, upperBound), lowerBound)
}

function useGesture(width: number, height: number) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

  const pinchHandlerRef = useRef<PinchGestureHandler>(null)
  const panHandlerRef = useRef<PanGestureHandler>(null)

  const { current: scale } = useRef(new Value(1 as number))

  const { current: focusImageX } = useRef(new Value(0 as number))
  const { current: focusImageY } = useRef(new Value(0 as number))

  const { current: pinchX } = useRef(new Value(0 as number))
  const { current: pinchY } = useRef(new Value(0 as number))
  const { current: panX } = useRef(new Value(0 as number))
  const { current: panY } = useRef(new Value(0 as number))

  const maxX = useMemo(() => Animated.max(sub(multiply(width / 2, scale), screenWidth / 2), 0), [])
  const minX = useMemo(() => multiply(-1, maxX), [])
  const maxY = useMemo(() => Animated.max(sub(multiply(height / 2, scale), screenHeight / 2), 0), [])
  const minY = useMemo(() => multiply(-1, maxY), [])

  const x = useMemo(() => add(pinchX, panX), [])
  const y = useMemo(() => add(pinchY, panY), [])

  const { current: horizontalPanIsEnabled } = useRef(new Value<0 | 1>(0))
  const { current: verticalPanIsEnabled } = useRef(new Value<0 | 1>(0))

  const [panHandlerIsEnabled, setPanHandlerIsEnabled] = useState(false)

  const handlePinch = useMemo(
    () =>
      event([
        {
          nativeEvent: ({
            state,
            scale: curScale,
            focalX,
            focalY,
          }: {
            state: Animated.Node<State>
            scale: Animated.Node<number>
            focalX: Animated.Node<number>
            focalY: Animated.Node<number>
          }) => {
            return block([
              set(scale, ranged(multiply(scale, pinchDiff(curScale, eq(state, State.ACTIVE))), 0.5, 4)),
              set(
                focusImageX,
                first(
                  ranged(divide(sub(focalX, screenWidth / 2, x), scale), -width / 2, width / 2),
                  eq(state, State.ACTIVE),
                ),
              ),
              set(
                focusImageY,
                first(
                  ranged(divide(sub(focalY, screenHeight / 2, y), scale), -height / 2, height / 2),
                  eq(state, State.ACTIVE),
                ),
              ),
              cond(and(eq(state, State.ACTIVE), greaterThan(scale, 1)), [
                set(pinchX, sub(sub(focalX, screenWidth / 2), add(multiply(focusImageX, scale), panX))),
                set(pinchY, sub(sub(focalY, screenHeight / 2), add(multiply(focusImageY, scale), panY))),
              ]),
              call([scale], ([scale]) => {
                setPanHandlerIsEnabled(scale > 1)
              }),
              set(horizontalPanIsEnabled, greaterThan(multiply(width, scale), screenWidth)),
              set(verticalPanIsEnabled, greaterThan(multiply(height, scale), screenHeight)),
              cond(eq(state, State.END), [
                cond(lessOrEq(scale, 1), [set(scale, 1), set(pinchX, 0), set(pinchY, 0), set(panX, 0), set(panY, 0)]),
              ]),
            ])
          },
        },
      ]),
    [width, height, screenWidth, screenHeight],
  )

  const handlePan = useMemo(
    () =>
      event([
        {
          nativeEvent: ({
            state,
            translationX,
            translationY,
          }: {
            state: Animated.Node<State>
            translationX: Animated.Node<number>
            translationY: Animated.Node<number>
          }) => {
            const panIsActive = eq(state, State.ACTIVE)

            return block([
              set(
                panX,
                ranged(
                  add(panX, panDiff(translationX, and(panIsActive, horizontalPanIsEnabled))),
                  sub(minX, pinchX),
                  sub(maxX, pinchX),
                ),
              ),
              set(
                panY,
                ranged(
                  add(panY, panDiff(translationY, and(panIsActive, verticalPanIsEnabled))),
                  sub(minY, pinchY),
                  sub(maxY, pinchY),
                ),
              ),
            ])
          },
        },
      ]),
    [width, height, screenWidth, screenHeight, horizontalPanIsEnabled, verticalPanIsEnabled],
  )

  const imageTransformStyle: ImageStyle = useMemo(
    () => ({
      transform: [{ translateX: x as any, translateY: y as any }, { scale: scale as any }],
    }),
    [],
  )

  return {
    pinchHandlerRef,
    panHandlerRef,
    handlePinch,
    handlePan,
    panHandlerIsEnabled,
    imageTransformStyle,
  }
}

export const ImageModal: React.FC<{ style?: ImageStyle; imageUri?: string; thumbnailUri?: string }> = React.memo(
  ({ style, imageUri, thumbnailUri }) => {
    const imageSizeStyle = useImageSizeStyle(thumbnailUri)
    const {
      pinchHandlerRef,
      panHandlerRef,
      handlePinch,
      handlePan,
      panHandlerIsEnabled,
      imageTransformStyle,
    } = useGesture(imageSizeStyle.width, imageSizeStyle.height)
    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

    return (
      <PinchGestureHandler
        ref={pinchHandlerRef}
        simultaneousHandlers={panHandlerRef}
        onGestureEvent={handlePinch}
        onHandlerStateChange={handlePinch}
      >
        <Animated.View>
          <PanGestureHandler
            ref={panHandlerRef}
            simultaneousHandlers={pinchHandlerRef}
            maxPointers={1}
            enabled={panHandlerIsEnabled}
            onGestureEvent={handlePan}
            onHandlerStateChange={handlePan}
          >
            <Animated.View
              style={[
                style,
                { width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center' },
              ]}
              collapsable={false}
            >
              <Animated.Image style={[imageSizeStyle, imageTransformStyle]} source={{ uri: imageUri }} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    )
  },
)
