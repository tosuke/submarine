import React, { createContext, useReducer, Dispatch, useContext, Reducer, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import $, { Transformer } from 'transform-ts'

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

const preferenceKey = 'v1/preference'

const PreferenceTransformer: Transformer<unknown, PreferenceType> = $.obj({
  appViaEnabled: $.boolean,
  quickPostBarEnabled: $.boolean,
  theme: $.literal('follow-system', 'light', 'dark'),
})
const loadPreference = async () => {
  try {
    const json = await AsyncStorage.getItem(preferenceKey)
    if (json == null) return undefined
    return PreferenceTransformer.transformOrThrow(JSON.parse(json))
  } catch {
    AsyncStorage.removeItem(preferenceKey).catch(() => {})
    return undefined
  }
}

const createResource = <A extends any>(f: () => Promise<A>): { get(): A } => {
  let state: 'pending' | 'resolved' | 'rejected' = 'pending'
  let value: unknown
  const promise = f().then(
    v => {
      state = 'resolved'
      value = v
    },
    err => {
      state = 'rejected'
      value = err
    },
  )

  return {
    get: () => {
      switch (state) {
        case 'pending':
          throw promise
        case 'resolved':
          return value as A
        case 'rejected':
          throw value // err
      }
    },
  }
}

const preferenceResource = createResource(loadPreference)

export const PreferenceProvider: React.FC = ({ children }) => {
  const initial = preferenceResource.get() || initialPreference
  const [state, dispatch] = useReducer(preferenceReducer, initial)

  useEffect(() => {
    AsyncStorage.setItem(preferenceKey, JSON.stringify(state))
  }, [state])

  return <PreferenceContext.Provider value={{ state, dispatch }}>{children}</PreferenceContext.Provider>
}
