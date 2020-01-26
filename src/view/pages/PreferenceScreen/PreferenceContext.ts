import { createContext, useContext } from 'react'

export interface PreferenceActions {
  logout: () => void
  pushToAppThemeScreen: () => void
  pushToPostViewScreen: () => void
}

export const PreferenceActionsContext = createContext<PreferenceActions>({
  logout: () => {},
  pushToAppThemeScreen: () => {},
  pushToPostViewScreen: () => {},
})

export const usePreferenceActions = () => useContext(PreferenceActionsContext)
