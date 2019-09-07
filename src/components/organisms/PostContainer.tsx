import React, { useMemo, useEffect, useCallback } from 'react'
import { Post as PostType } from '../../models'
import { PostBloc } from '../../blocs/postBloc'
import { useValueObservable } from '../../hooks/useObservable'
import { Post, ThumbnailProp } from '../molecules/Post'
import { ImageFile, VideoFile } from '../../models/file'
import { useNaviagtion } from '../../hooks/useNavigation'
import { LayoutAnimation } from 'react-native'

export const PostContainer: React.FC<{ post: PostType }> = ({ post }) => {
  const postBloc = useMemo(() => new PostBloc(post), [post])
  useEffect(() => () => postBloc.dispose(), [post])
  const relativeTime = useValueObservable(() => postBloc.relativeTime$, [postBloc])

  const avatarVariant = post.user.avatarFile && post.user.avatarFile.thumbnailVariant
  const avatarThumbnailUri = (avatarVariant && avatarVariant.url) || undefined

  const { navigate } = useNaviagtion()

  const thumbnails = useMemo<readonly ThumbnailProp[]>(() => {
    const files = post.files.filter((file): file is ImageFile | VideoFile => file.isImageFile() || file.isVideoFile())
    return files.map((file, index) => {
      const v = file.thumbnailVariant
      return {
        type: file.type,
        thumbnailUri: v.url,
        onPress: () => {
          LayoutAnimation.easeInEaseOut()
          navigate('FileModal', { files, index })
        },
      }
    })
  }, [post.files])

  const tokens = useMemo(() => post.parse(), [post])

  const openUrl = useCallback(
    (url: string) => {
      postBloc.openUrl$.next(url)
    },
    [postBloc],
  )

  return (
    <Post
      style={{ paddingVertical: 6 }}
      userName={post.user.name}
      userScreenName={post.user.screenName}
      avatarThumbnailUri={avatarThumbnailUri}
      relativeTime={relativeTime}
      tokens={tokens}
      openUrl={openUrl}
      thumbnails={thumbnails}
      appName={post.application.name}
      appIsAutomated={post.application.isAutomated}
    />
  )
}
