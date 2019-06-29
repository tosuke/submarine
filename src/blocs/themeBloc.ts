import { Theme } from 'react-native-paper'
import { BehaviorSubject } from 'rxjs'
import { ValueObservable } from '../utils'

export class ThemeBloc {
  // Output Controllers
  private _theme$: BehaviorSubject<Theme>

  // Outputs
  get theme$(): ValueObservable<Theme> {
    return this._theme$
  }

  constructor(defaultTheme: Theme) {
    this._theme$ = new BehaviorSubject(defaultTheme)
  }

  dispose(): void {
    this._theme$.unsubscribe()
  }
}