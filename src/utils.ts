import { Observable } from 'rxjs'

export interface ValueObservable<T> extends Observable<T> {
  readonly value: T
}
