import { Subject, Observable, Observer, BehaviorSubject } from 'rxjs'
import { bufferTime, map, filter } from 'rxjs/operators'

type ConnectionState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'

export class RxWebSocket {
  private ws: WebSocket | null = null

  private _messages$ = new Subject<unknown>()
  private _send$ = new Subject<unknown>()
  private _connectionState$ = new BehaviorSubject<ConnectionState>('CLOSED')

  get messages$(): Observable<unknown> {
    return this._messages$.asObservable()
  }

  get send$(): Observer<unknown> {
    return this._send$
  }

  get connectionState$(): Observable<ConnectionState> {
    return this._connectionState$.asObservable()
  }

  constructor(private factory: () => WebSocket | Promise<WebSocket>, pingDurationMs: number) {
    this.connect()
    this._send$.subscribe(data => {
      if (this.ws) {
        this.ws.send(JSON.stringify(data))
      }
    })
    this._messages$.pipe(
      bufferTime(pingDurationMs),
      map(events => [events.length, this._connectionState$.value]),
      filter(([num, state]) => num === 0 && state === 'OPEN'),
    ).subscribe(() => {
      this.close()
      this.connect().catch((() => {}))
    })
  }

  private async openWS(): Promise<WebSocket> {
    const ws = await this.factory()
    if(ws.readyState === 1 /* OPEN */) return ws
    return await new Promise((res, rej) => {
      ws.addEventListener('open', () => {
        res(ws)
      })
      ws.addEventListener('error', ev => {
        rej((ev as ErrorEvent).error)
      })
    })
  }

  private async connect(retryNum: number = 10) {
    if(this._connectionState$.value !== 'CLOSED' && this._connectionState$.value !== 'CLOSING') return
    this._connectionState$.next('CONNECTING')

    let err: Error | null = null
    for (let i = 0; i < retryNum; i++) {
      try {
        this.ws = await this.openWS()
        break
      } catch (e) {
        err = e
        await sleep(1000)
      }
    }
    if (err) throw err
    if (this.ws == null) throw 'invalid' // assert はよ
    this._connectionState$.next('OPEN')

    let closeWithError = false
    this.ws.addEventListener('message', ev => {
      this._messages$.next(JSON.parse(ev.data))
    })

    this.ws.addEventListener('error', () => {
      closeWithError = true
      this.close()
      this.connect().catch(() => {})
    })

    this.ws.addEventListener('close', () => {
      if(closeWithError) return
      this._connectionState$.next('CLOSED')
      this.connect()
    })
  }

  private close() {
    if (this.ws) {
      this._connectionState$.next('CLOSING')
      this.ws.close()
    }
  }
}

function sleep(ms: number) {
  return new Promise<void>(res => setTimeout(res, ms))
}
