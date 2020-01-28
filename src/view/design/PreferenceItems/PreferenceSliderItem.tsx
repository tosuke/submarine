import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Slider, NativeSlider } from '../Slider'
import { PreferenceItem, PreferenceItemProps } from './PreferenceItem'
import { useTheme, Caption } from 'react-native-paper'
import { Platform, View } from 'react-native'

export type PreferenceSliderItemProps = PreferenceItemProps & {
  value?: number
  onValueChange?: (value: number) => void
  formatValue?: (value: number) => string
  minimumValue?: number
  maximumValue?: number
  step?: number
}

export const PreferenceSliderItem = ({
  children,
  value,
  onValueChange,
  formatValue,
  minimumValue,
  maximumValue,
  step,
  ...rest
}: PreferenceSliderItemProps) => {
  const theme = useTheme()
  const backgroundColor = Platform.select({
    ios: theme.colors.surface,
  })
  const sliderRef = useRef<NativeSlider>(null)
  const [sliding, setSliding] = useState(false)
  const [draft, setDraft] = useState(value)

  const updateValue = useCallback(
    (v: number) => {
      onValueChange && onValueChange(v)
      setDraft(v)
      setSliding(true)
    },
    [onValueChange],
  )
  const onSlidingComplete = useCallback(() => setSliding(false), [])

  useEffect(() => {
    if (sliderRef.current && !sliding) {
      sliderRef.current.setNativeProps({
        value,
      })
      setDraft(value)
    }
  }, [value, sliding])

  return (
    <PreferenceItem {...rest}>
      <View
        style={{ paddingHorizontal: 12, paddingBottom: 8, backgroundColor, flexDirection: 'row', alignItems: 'center' }}
      >
        <Caption style={{ fontSize: 16, paddingRight: 6 }}>{formatValue && draft && formatValue(draft)}</Caption>
        <Slider
          ref={sliderRef}
          style={{ flex: 1 }}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          onValueChange={updateValue}
          onSlidingComplete={onSlidingComplete}
        />
      </View>
      {children}
    </PreferenceItem>
  )
}
