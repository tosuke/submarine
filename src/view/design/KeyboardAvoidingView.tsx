import React, { useState, useMemo, useCallback } from 'react'
import { StyleProp, ViewStyle, View, LayoutRectangle, LayoutChangeEvent, LayoutAnimation, Platform } from 'react-native'
import { HEADER_HEIGHT } from '../constants/header'
import { useKeyboardChangeFrameEffect } from '../../hooks/useKeyboardEffect'

export type KeyboardAvoidingViewProps = {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  keyboardVerticalOffset?: number
}

export const KeyboardAvoidingView = ({ children, style, keyboardVerticalOffset }: KeyboardAvoidingViewProps) => {
  const keyboardOffset = keyboardVerticalOffset == null ? HEADER_HEIGHT : keyboardVerticalOffset
  const [keyboardY, updateKeyboardY] = useState<number | undefined>()
  const [frame, updateFrame] = useState<LayoutRectangle | undefined>()
  const bottom = useMemo(() => {
    if (!frame || !keyboardY) return 0
    return Math.max(frame.y + frame.height + keyboardOffset - keyboardY, 0)
  }, [keyboardY, frame, keyboardOffset])

  const onLayout = useCallback((ev: LayoutChangeEvent) => {
    updateFrame(ev.nativeEvent.layout)
  }, [])

  useKeyboardChangeFrameEffect(ev => {
    if (ev == null) {
      updateKeyboardY(undefined)
      return
    }
    updateKeyboardY(ev.endCoordinates.screenY)
    if (ev.duration != null && ev.easing != null) {
      const easing = Platform.OS === 'android' && ev.easing === 'keyboard' ? 'easeInEaseOut' : ev.easing
      LayoutAnimation.configureNext({
        duration: Math.max(ev.duration, 10),
        update: {
          duration: Math.max(ev.duration, 10),
          type: LayoutAnimation.Types[easing],
        },
      })
    }
  })

  return (
    <View
      onLayout={onLayout}
      style={[
        style,
        {
          paddingBottom: Platform.select({
            default: bottom,
            android: 0,
          }),
        },
      ]}
    >
      {children}
    </View>
  )
}
