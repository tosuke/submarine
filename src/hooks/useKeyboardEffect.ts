import { useEffect, useRef } from 'react'
import { KeyboardEventListener, EmitterSubscription, Platform, Keyboard } from 'react-native'

const useKeyboardListenerRef = (listener: KeyboardEventListener) => {
  const listenerRef = useRef<KeyboardEventListener>(() => {})
  useEffect(() => {
    listenerRef.current = listener
  })
  return listenerRef
}

export const useKeyboardChangeFrameEffect = (listener: KeyboardEventListener) => {
  const listenerRef = useKeyboardListenerRef(listener)
  useEffect(() => {
    const onKeyboardChange: KeyboardEventListener = ev => listenerRef.current(ev)
    let subs: EmitterSubscription[] = []
    if (Platform.OS === 'ios') {
      subs.push(Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange))
    } else if (Platform.OS === 'android') {
      subs.push(Keyboard.addListener('keyboardDidShow', onKeyboardChange))
      subs.push(Keyboard.addListener('keyboardDidHide', onKeyboardChange))
    }

    return () => subs.forEach(sub => sub.remove())
  }, [])
}
