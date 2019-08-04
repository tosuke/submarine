import React, { useMemo, useEffect } from 'react'
import { Post as PostType } from '../../models'
import { PostBloc } from '../../blocs/postBloc'
import { useValueObservable } from '../hooks/useObservable'
import { Post } from '../presenters/Post'

export const PostContainer: React.FC<{ post: PostType }> = ({ post }) => {
  const postBloc = useMemo(() => new PostBloc(post), [post])
  useEffect(() => () => postBloc.dispose(), [post])
  const relativeTime = useValueObservable(() => postBloc.relativeTime$, [postBloc])

  return <Post post={post} relativeTime={relativeTime} />
}
