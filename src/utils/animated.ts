import Animated from 'react-native-reanimated'

const { Value, set, cond, lessOrEq, greaterOrEq, sub, divide } = Animated

export function first(value: Animated.Adaptable<number>, updating: Animated.Adaptable<0 | 1>): Animated.Node<number> {
  const isFirst = new Value<0 | 1>(1)
  const firstValue = new Value<number>()
  return cond(
    updating,
    cond(isFirst, [set(firstValue, value), set(isFirst, 0), firstValue], firstValue),
    set(isFirst, 1),
  )
}

export function pinchDiff(
  value: Animated.Adaptable<number>,
  updating: Animated.Adaptable<0 | 1>,
): Animated.Node<number> {
  const tmp = new Value(0 as number)
  const prev = new Value(1 as number)

  return cond(updating, [set(tmp, divide(value, prev)), set(prev, value), tmp], set(prev, 1))
}

export function panDiff(value: Animated.Adaptable<number>, updating: Animated.Adaptable<0 | 1>): Animated.Node<number> {
  const tmp = new Value(0 as number)
  const prev = new Value(0 as number)

  return cond(updating, [set(tmp, sub(value, prev)), set(prev, value), tmp], set(prev, 0))
}

export function ranged(
  value: Animated.Adaptable<number>,
  lowerBound: Animated.Adaptable<number>,
  upperBound: Animated.Adaptable<number>,
): Animated.Node<number> {
  return cond(greaterOrEq(value, lowerBound), cond(lessOrEq(value, upperBound), value, upperBound), lowerBound)
}
