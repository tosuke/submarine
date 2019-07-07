import { AsyncStorage, Linking } from 'react-native'
import { BehaviorSubject, Subject, Observer, Observable } from 'rxjs'
import { ValueObservable } from '../utils'
import { map, tap, switchMap, debounceTime, catchError } from 'rxjs/operators'
import ky, { HTTPError } from 'ky'
import * as $ from 'transform-ts'
import { SeaClient } from '../infra/seaClient'
import { clientId, clientSecret, restEndpoint, wsEndpoint, endpoint } from '../config'

const USER_TOKEN_KEY = 'userToken'

export class AuthBloc {
  // Input Controllers
  private _linkToSignInURL$ = new Subject<void>()
  private _linkToAuthzURL$ = new Subject<void>()
  private _authorizeWithCode$ = new Subject<string>()

  // Output Controllers
  private _seaClient$ = new BehaviorSubject<SeaClient | undefined>(undefined)
  private _loading$ = new BehaviorSubject(true)
  private _authorizing$ = new BehaviorSubject(false)
  private _invalidCodeError$ = new Subject<void>()

  // Inputs
  get linkToSignInURL$(): Observer<void> {
    return this._linkToSignInURL$
  }
  get linkToAuthzURL$(): Observer<void> {
    return this._linkToAuthzURL$
  }
  get authorizeWithCode$(): Observer<string> {
    return this._authorizeWithCode$
  }

  // Outputs
  get seaClient$(): ValueObservable<SeaClient | undefined> {
    return this._seaClient$
  }
  get loading$(): ValueObservable<boolean> {
    return this._loading$
  }
  get authorizing$(): ValueObservable<boolean> {
    return this._authorizing$
  }
  get invalidCodeError$(): Observable<void> {
    return this._invalidCodeError$
  }

  constructor() {
    AsyncStorage.getItem(USER_TOKEN_KEY).then(token => {
      if (token) {
        this._seaClient$.next(new SeaClient(restEndpoint, wsEndpoint, token))
      }
      this._loading$.next(false)
    })

    this._linkToSignInURL$.pipe(switchMap(() => Linking.openURL(endpoint))).subscribe()

    this._linkToAuthzURL$
      .pipe(
        map(() => {
          const state = 'aaa'
          return new URL(`/oauth/authorize?state=${state}&response_type=code&client_id=${clientId}`, endpoint)
        }),
        switchMap(url => Linking.openURL(url.href)),
      )
      .subscribe()

    this._authorizeWithCode$
      .pipe(
        debounceTime(200),
        tap(() => this._authorizing$.next(true)),
        switchMap(async code => {
          const state = 'aaa'
          const json = await ky
            .post(new URL('/oauth/token', endpoint), {
              json: {
                client_id: clientId,
                client_secret: clientSecret,
                code,
                grant_type: 'authorization_code',
                state,
              },
            })
            .json()
          const { access_token } = $.obj({
            access_token: $.string,
            token_type: $.string,
          }).transformOrThrow(json)
          return access_token
        }),
        tap(token => {
          AsyncStorage.setItem('userToken', token)
        }),
        tap(
          token => {
            this._authorizing$.next(false)
            this._seaClient$.next(new SeaClient(restEndpoint, wsEndpoint, token))
          },
          () => {
            this._authorizing$.next(false)
          },
        ),
        catchError((e, caught) => {
          if (e instanceof HTTPError) {
            this._invalidCodeError$.next()
            return caught
          }
          throw e
        })
      )
      .subscribe()
  }

  dispose(): void {
    this._authorizeWithCode$.complete()
    this._linkToAuthzURL$.complete()
    this._linkToSignInURL$.complete()
  }
}
