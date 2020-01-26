import React, { forwardRef } from 'react'
import { Platform } from 'react-native'
import { NativeSlider, NativeSliderProps } from './NativeSlider'
import { useTheme } from 'react-native-paper'

export type SliderProps = NativeSliderProps

export const Slider = forwardRef((props: SliderProps, ref: React.Ref<NativeSlider>) => {
  const theme = useTheme()
  const tintColor = Platform.select({
    android: theme.colors.primary,
  })
  const minimumTrackTintColor = Platform.select({
    android: theme.colors.primary,
  })
  const maximumTrackTintColor = Platform.select({
    android: theme.colors.text,
  })

  return (
    <NativeSlider
      ref={ref}
      thumbTintColor={tintColor}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      {...props}
    />
  )
})
