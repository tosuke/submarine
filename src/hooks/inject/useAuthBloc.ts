import React, { useMemo, useEffect, useContext } from 'react'
import { AuthBloc } from '../../blocs_old/authBloc'

const AuthBlocCtx = React.createContext<AuthBloc | undefined>(undefined)

export const AuthBlocProvider: React.FC = ({ children }) => {
  const authBloc = useMemo(() => new AuthBloc(), [])
  useEffect(() => () => authBloc.dispose(), [authBloc])
  return React.createElement(AuthBlocCtx.Provider, { value: authBloc }, children)
}

export function useAuthBloc(): AuthBloc {
  return useContext(AuthBlocCtx)!
}
