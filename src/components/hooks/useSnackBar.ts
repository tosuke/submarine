import { useState, useCallback, useMemo } from 'react'

type Action = {
  label: string
  accessibilityLabel?: string
  onPress: () => void
}

type ActionFactory = (props: { dismiss: () => void }) => Action

export function useSnackBar({ duration: defaultDuration, action: actionFactory }: Partial<{ duration: number, action: Action | ActionFactory }>) {
  const [visible, setVisible] = useState(true)
  const [duration, setDuration] = useState<number | undefined>(defaultDuration)

  const show = useCallback((duration?: number) => {
    setVisible(true)
    setDuration(duration || defaultDuration)
  }, [])

  const dismiss = useCallback(() => {
    setVisible(false)
    setDuration(defaultDuration)
  }, [])

  const action = useMemo<Action | undefined>(() => {
    if(actionFactory == null) return undefined
    return typeof actionFactory === 'function' ? actionFactory({ dismiss }) : actionFactory
  }, [dismiss, actionFactory])

  return {
    visible,
    duration,
    action,
    dismiss,
    show,
  }
}