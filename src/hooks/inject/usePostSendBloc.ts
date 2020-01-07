import React, { createContext, useMemo, useEffect, useContext } from 'react'
import { PostSendBloc } from '../../blocs/postSendBloc'
import { useSeaClient } from './useSeaClient'

const PostSendBlocCtx = createContext<PostSendBloc | undefined>(undefined)

export const PostSendBlocProvider: React.FC = ({ children }) => {
  const seaClient = useSeaClient()
  const postSendBloc = useMemo(() => seaClient && new PostSendBloc(seaClient), [seaClient])
  useEffect(() => () => postSendBloc && postSendBloc.dispose(), [postSendBloc])
  if (postSendBloc == null) return React.createElement(React.Fragment, {}, children)
  return React.createElement(PostSendBlocCtx.Provider, { value: postSendBloc }, children)
}

export function usePostSendBloc(): PostSendBloc {
  return useContext(PostSendBlocCtx)!
}
