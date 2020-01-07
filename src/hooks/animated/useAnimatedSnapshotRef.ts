import { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

export const useAnimatedSnapshotRef = (node: Animated.AnimatedWithChildren) => {
  const ref = useRef<number>()
  useEffect(() => {
    const id = node.addListener(({ value }) => {
      ref.current = value
    })
    return () => node.removeListener(id)
  }, [node])
  return ref
}
