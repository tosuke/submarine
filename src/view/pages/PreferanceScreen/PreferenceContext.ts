import { createContext, useContext } from 'react'

export interface Preference {
  logout: () => void
}

export const PreferenceContext = createContext<Preference>({
  logout: () => {},
})

export const usePreference = () => useContext(PreferenceContext)
