import { useContext } from 'react'
import { NavigationContext } from 'react-navigation'

export function useNaviagtion() {
  return useContext(NavigationContext)
}
