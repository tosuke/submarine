import { useMemo, useEffect } from 'react'

export const useDisposable = <A extends { dispose: () => void }>(factory: () => A, deps: readonly unknown[]) => {
  const obj = useMemo(factory, deps)
  useEffect(() => () => obj.dispose(), [obj])
  return obj
}
