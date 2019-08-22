import React, { useMemo, useEffect } from 'react'
import { Post as PostType } from '../../models'
import { PostBloc } from '../../blocs/postBloc'
import { useValueObservable } from '../../hooks/useObservable'
import { Post, ThumbnailProp } from '../molecules/Post'
import { ImageFile, VideoFile } from '../../models/file'

export const PostContainer: React.FC<{ post: PostType }> = ({ post }) => {
  const postBloc = useMemo(() => new PostBloc(post), [post])
  useEffect(() => () => postBloc.dispose(), [post])
  const relativeTime = useValueObservable(() => postBloc.relativeTime$, [postBloc])

  const avatarVariant = post.user.avatarFile && post.user.avatarFile.thumbnailVariant
  const avatarThumbnailUri = (avatarVariant && avatarVariant.url) || undefined

  const thumbnails = useMemo<readonly ThumbnailProp[]>(() => {
    return post.files
      .filter((file): file is ImageFile | VideoFile => file.isImageFile() || file.isVideoFile())
      .map(file => {
        const v = file.thumbnailVariant
        return {
          type: file.type,
          thumbnailUri: v.url,
        }
      })
  }, [post.files])

  return (
    <Post
      style={{ paddingVertical: 6 }}
      userName={post.user.name}
      userScreenName={post.user.screenName}
      avatarThumbnailUri={avatarThumbnailUri}
      relativeTime={relativeTime}
      text={post.text}
      thumbnails={thumbnails}
      appName={post.application.name}
      appIsAutomated={post.application.isAutomated}
    />
  )
}
