import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Image, Dimensions, ImageStyle, StatusBar } from 'react-native'
import { PinchGestureHandler, State, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { first, panDiff, pinchDiff, ranged } from '../../utils/animated'
const { Value, event, block, set, call, cond, eq, lessOrEq, greaterThan, and, add, sub, multiply, divide } = Animated

function useBoxSize() {
  const { width, height } = Dimensions.get('screen')
  return {
    boxWidth: width,
    boxHeight: height - (StatusBar.currentHeight || 0),
  }
}

function useImageSizeStyle(thumbnailUri?: string) {
  // width / height
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (thumbnailUri == null) return
    Image.getSize(thumbnailUri, (w, h) => setAspect(w / h), () => {})
  }, [thumbnailUri])

  const { boxWidth, boxHeight } = useBoxSize()
  const screenAspect = boxWidth / boxHeight
  return aspect > screenAspect
    ? {
        width: boxWidth,
        height: boxWidth / aspect,
      }
    : {
        width: boxHeight * aspect,
        height: boxHeight,
      }
}

function useGesture(width: number, height: number) {
  const { boxWidth, boxHeight } = useBoxSize()

  const pinchHandlerRef = useRef<PinchGestureHandler>(null)
  const panHandlerRef = useRef<PanGestureHandler>(null)
  const tapHandlerRef = useRef<TapGestureHandler>(null)

  const { current: scale } = useRef(new Value(1 as number))

  const { current: focusImageX } = useRef(new Value(0 as number))
  const { current: focusImageY } = useRef(new Value(0 as number))

  const { current: pinchX } = useRef(new Value(0 as number))
  const { current: pinchY } = useRef(new Value(0 as number))
  const { current: panX } = useRef(new Value(0 as number))
  const { current: panY } = useRef(new Value(0 as number))

  const reset = useMemo(
    () =>
      block([
        set(scale, 1),
        set(focusImageX, 0),
        set(focusImageY, 0),
        set(pinchX, 0),
        set(pinchY, 0),
        set(panX, 0),
        set(panY, 0),
      ]),
    [],
  )

  const maxX = useMemo(() => Animated.max(sub(multiply(width / 2, scale), boxWidth / 2), 0), [])
  const minX = useMemo(() => multiply(-1, maxX), [])
  const maxY = useMemo(() => Animated.max(sub(multiply(height / 2, scale), boxHeight / 2), 0), [])
  const minY = useMemo(() => multiply(-1, maxY), [])

  const x = useMemo(() => add(pinchX, panX), [])
  const y = useMemo(() => add(pinchY, panY), [])

  const horizontalPanIsEnabled = useMemo(() => greaterThan(multiply(width, scale), boxWidth), [width, boxWidth])
  const verticalPanIsEnabled = useMemo(() => greaterThan(multiply(height, scale), boxHeight), [height, boxHeight])

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
                  ranged(divide(sub(focalX, boxWidth / 2, x), scale), -width / 2, width / 2),
                  eq(state, State.ACTIVE),
                ),
              ),
              set(
                focusImageY,
                first(
                  ranged(divide(sub(focalY, boxHeight / 2, y), scale), -height / 2, height / 2),
                  eq(state, State.ACTIVE),
                ),
              ),
              cond(and(eq(state, State.ACTIVE), greaterThan(scale, 1)), [
                set(pinchX, sub(sub(focalX, boxWidth / 2), add(multiply(focusImageX, scale), panX))),
                set(pinchY, sub(sub(focalY, boxHeight / 2), add(multiply(focusImageY, scale), panY))),
              ]),
              call([scale], ([scale]) => {
                setPanHandlerIsEnabled(scale > 1)
              }),
              cond(eq(state, State.END), [cond(lessOrEq(scale, 1), reset)]),
            ])
          },
        },
      ]),
    [width, height, boxWidth, boxHeight],
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
    [width, height, boxWidth, boxHeight, horizontalPanIsEnabled, verticalPanIsEnabled],
  )

  const handleTap = event([
    {
      nativeEvent: {
        state: (state: Animated.Node<State>) => cond(eq(state, State.END), reset),
      },
    },
  ])

  const imageTransformStyle: ImageStyle = useMemo(
    () => ({
      transform: [{ translateX: x as any, translateY: y as any }, { scale: scale as any }],
    }),
    [],
  )

  return {
    pinchHandlerRef,
    panHandlerRef,
    tapHandlerRef,
    handlePinch,
    handlePan,
    handleTap,
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
      tapHandlerRef,
      handlePinch,
      handlePan,
      handleTap,
      panHandlerIsEnabled,
      imageTransformStyle,
    } = useGesture(imageSizeStyle.width, imageSizeStyle.height)
    const { boxWidth, boxHeight } = useBoxSize()

    return (
      <PinchGestureHandler
        ref={pinchHandlerRef}
        simultaneousHandlers={[panHandlerRef, tapHandlerRef]}
        onGestureEvent={handlePinch}
        onHandlerStateChange={handlePinch}
      >
        <Animated.View>
          <PanGestureHandler
            ref={panHandlerRef}
            simultaneousHandlers={[pinchHandlerRef, tapHandlerRef]}
            maxPointers={1}
            enabled={panHandlerIsEnabled}
            onGestureEvent={handlePan}
            onHandlerStateChange={handlePan}
          >
            <Animated.View>
              <TapGestureHandler numberOfTaps={2} onHandlerStateChange={handleTap} enabled={panHandlerIsEnabled}>
                <Animated.View
                  style={[
                    style,
                    {
                      marginTop: StatusBar.currentHeight,
                      width: boxWidth,
                      height: boxHeight,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                  collapsable={false}
                >
                  <Animated.Image style={[imageSizeStyle, imageTransformStyle]} source={{ uri: imageUri }} />
                </Animated.View>
              </TapGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    )
  },
)
