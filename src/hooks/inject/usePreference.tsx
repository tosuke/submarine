import React, { createContext, useContext, useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'
import $, { Transformer } from 'transform-ts'

export type PreferenceType = {
  appViaEnabled: boolean
  quickPostBarEnabled: boolean
  theme: 'light' | 'dark' | 'follow-system'
  postFontSize: number
  postAvatarSize: number
}

const initialPreference: PreferenceType = {
  appViaEnabled: true,
  quickPostBarEnabled: false,
  theme: 'follow-system',
  postFontSize: 15,
  postAvatarSize: 32,
}

export const PreferenceContext = createContext<{
  state: PreferenceType
  update: (f: (state: PreferenceType) => PreferenceType) => void
}>({
  state: initialPreference,
  update: () => {},
})

export const usePreference = () => useContext(PreferenceContext).state
export const usePreferenceUpdate = () => useContext(PreferenceContext).update

const preferenceKey = 'v1/preference'

const PreferenceTransformer: Transformer<unknown, PreferenceType> = $.obj({
  appViaEnabled: $.boolean,
  quickPostBarEnabled: $.boolean,
  theme: $.literal('follow-system', 'light', 'dark'),
  postFontSize: $.number,
  postAvatarSize: $.number,
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
  const [state, update] = useState(initial)

  useEffect(() => {
    AsyncStorage.setItem(preferenceKey, JSON.stringify(state))
  }, [state])

  return <PreferenceContext.Provider value={{ state, update }}>{children}</PreferenceContext.Provider>
}
