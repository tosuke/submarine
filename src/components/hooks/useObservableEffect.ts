import { useEffect } from 'react'
import { Observable } from 'rxjs'

export function useObservableEffect<T>(factory: () => Observable<T>, effect: (x: T) => void, deps: unknown[] = []) {
  useEffect(() => {
    const sub = factory().subscribe(effect)
    return () => sub.unsubscribe()
  }, deps)
}
