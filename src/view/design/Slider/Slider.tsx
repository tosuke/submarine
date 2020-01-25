import React from 'react'
import { Platform } from 'react-native'
import { NativeSlider, NativeSliderProps } from './NativeSlider'
import { useTheme } from 'react-native-paper'

export type SliderProps = NativeSliderProps

export const Slider = (props: SliderProps) => {
  const theme = useTheme()
  const tintColor = Platform.select({
    android: theme.colors.primary,
  })
  const minimumTrackTintColor = Platform.select({
    android: theme.colors.primary,
  })

  return <NativeSlider thumbTintColor={tintColor} minimumTrackTintColor={minimumTrackTintColor} {...props} />
}
