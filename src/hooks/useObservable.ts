import { useState, useEffect, useMemo } from 'react'
import { Observable } from 'rxjs'
import { ValueObservable } from '../utils/valueObservable'

export function useObservable<A, B>(inputFactory: () => Observable<A>, initialValue: B, deps: unknown[] = []): A | B {
  const [state, setState] = useState<A | B>(initialValue)

  useEffect(() => {
    const input$ = inputFactory()
    const sub = input$.subscribe(setState)
    return () => sub.unsubscribe()
  }, deps)

  return state
}

export function useValueObservable<A>(inputFactory: () => ValueObservable<A>, deps: unknown[] = []): A {
  const input$ = useMemo(inputFactory, deps)
  const [state, setState] = useState<A>(input$.value)

  useEffect(() => {
    const sub = input$.subscribe(setState)
    return () => sub.unsubscribe()
  }, [input$])

  return state
}

export function useObservableEffect<A>(factory: () => Observable<A>, effect: (x: A) => void, deps: unknown[] = []) {
  useEffect(() => {
    const sub = factory().subscribe(effect)
    return () => sub.unsubscribe()
  }, deps)
}
