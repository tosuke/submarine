import { createContext, useContext } from 'react'

export interface PreferenceActions {
  logout: () => void
  pushToAppThemeScreen: () => void
}

export const PreferenceActionsContext = createContext<PreferenceActions>({
  logout: () => {},
  pushToAppThemeScreen: () => {},
})

export const usePreferenceActions = () => useContext(PreferenceActionsContext)
