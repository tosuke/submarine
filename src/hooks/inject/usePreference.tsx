import React, { createContext, useReducer, Dispatch, useContext, Reducer } from 'react'

export type PreferenceType = {
  appViaEnabled: boolean
  quickPostBarEnabled: boolean
  theme: 'light' | 'dark' | 'follow-system'
}

const initialPreference: PreferenceType = {
  appViaEnabled: true,
  quickPostBarEnabled: false,
  theme: 'follow-system',
}

export type PreferenceActions =
  | {
      type: 'appViaStateUpdated'
      appViaEnabled: boolean
    }
  | {
      type: 'quickPostBarStateUpdated'
      quickPostBarEnabled: boolean
    }
  | {
      type: 'themeUpdated'
      theme: PreferenceType['theme']
    }

const PreferenceContext = createContext<{ state: PreferenceType; dispatch: Dispatch<PreferenceActions> }>({
  state: initialPreference,
  dispatch: () => {},
})

export const usePreference = () => useContext(PreferenceContext).state
export const usePreferenceDispatch = () => useContext(PreferenceContext).dispatch

const preferenceReducer: Reducer<PreferenceType, PreferenceActions> = (state, action) => {
  switch (action.type) {
    case 'appViaStateUpdated':
      return {
        ...state,
        appViaEnabled: action.appViaEnabled,
      }
    case 'quickPostBarStateUpdated':
      return {
        ...state,
        quickPostBarEnabled: action.quickPostBarEnabled,
      }
    case 'themeUpdated':
      return {
        ...state,
        theme: action.theme,
      }
  }
}

export const PreferenceProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(preferenceReducer, initialPreference)

  return <PreferenceContext.Provider value={{ state, dispatch }}>{children}</PreferenceContext.Provider>
}
