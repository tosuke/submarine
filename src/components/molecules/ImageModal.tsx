import React, { useState, useRef, useMemo } from 'react'
import { Dimensions, ImageStyle, StatusBar } from 'react-native'
import { PinchGestureHandler, State, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
import { useFullScreenImageSize } from '../../hooks/useFullScreenImageSize'
import Animated from 'react-native-reanimated'
import { first, panDiff, pinchDiff, ranged } from '../../utils/animated'
const { Value, event, block, set, call, cond, eq, lessOrEq, greaterThan, and, add, sub, multiply, divide } = Animated

function useGesture(width: number, height: number) {
  const { width: boxWidth, height: boxHeight } = Dimensions.get('window')

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

  const { current: maxX } = useRef(new Value(0 as number))
  const { current: minX } = useRef(new Value(0 as number))
  const { current: maxY } = useRef(new Value(0 as number))
  const { current: minY } = useRef(new Value(0 as number))

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

  Animated.useCode(
    block([set(maxX, Animated.max(sub(multiply(width / 2, scale), boxWidth / 2), 0)), set(minX, multiply(-1, maxX))]),
    [width, boxWidth],
  )

  Animated.useCode(
    block([set(maxY, Animated.max(sub(multiply(height / 2, scale), boxHeight / 2), 0)), set(minY, multiply(-1, maxY))]),
    [height, boxHeight],
  )

  const x = useMemo(() => add(pinchX, panX), [])
  const y = useMemo(() => add(pinchY, panY), [])

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
    [width, boxWidth, height, boxHeight],
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
              set(panX, ranged(add(panX, panDiff(translationX, panIsActive)), sub(minX, pinchX), sub(maxX, pinchX))),
              set(panY, ranged(add(panY, panDiff(translationY, panIsActive)), sub(minY, pinchY), sub(maxY, pinchY))),
            ])
          },
        },
      ]),
    [],
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

export const ImageModal: React.FC<{ style?: ImageStyle; imageUri: string; thumbnailUri?: string }> = React.memo(
  ({ style, imageUri, thumbnailUri }) => {
    const imageSizeStyle = useFullScreenImageSize(thumbnailUri || imageUri)
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
    const { width, height } = Dimensions.get('screen')

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
                      width,
                      height,
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
