import { Observer, Subject, Observable } from 'rxjs'
import { SeaClient } from '../infra/seaClient'
import { switchMap, debounceTime } from 'rxjs/operators'

export class PostSendBloc {
  // Input Controllers
  private _send$ = new Subject<string>()

  // Output Controllers
  private _sendComplete$ = new Subject<void>()
  private _emptyTextError$ = new Subject<void>()

  // Inputs
  get send$(): Observer<string> {
    return this._send$
  }

  // Outputs
  get sendComplete$(): Observable<void> {
    return this._sendComplete$.asObservable()
  }

  get emptyTextError$(): Observable<void> {
    return this._emptyTextError$.asObservable()
  }

  constructor(seaClient: SeaClient) {
    let sending = false
    this._send$
      .pipe(
        debounceTime(200),
        switchMap(async text => {
          if (text.length === 0) {
            this._emptyTextError$.next()
            return
          }
          if (sending) return
          sending = true
          try {
            await seaClient.doPost(text)
            this._sendComplete$.next()
          } finally {
            sending = false
          }
        }),
      )
      .subscribe()
  }

  dispose() {
    this._send$.complete()
    this._emptyTextError$.complete()
  }
}
