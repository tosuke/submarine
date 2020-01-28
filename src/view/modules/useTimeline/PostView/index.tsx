import React from 'react'
import styled from 'styled-components/native'
import { memoize } from 'lodash-es'
import { Post } from '../../../../models'
import { useTimelineActions } from '../inject'
import { Header } from './Header'
import { Avatar } from './Avatar'
import { Thumbnail } from './Thumbnail'
import { Body } from './Body'
import { Footer } from './Footer'
import { usePreference } from '../../../../hooks/inject'
import { ViewStyle, View } from 'react-native'

const createAvatarWrapperStyle = memoize(
  (avatarSize: number): ViewStyle => ({
    marginRight: 2 + avatarSize / 8,
  }),
)

const PostViewWrapper = styled.View`
  flex-direction: row;
`

const PostContentWrapper = styled.View`
  flex: 1;
`

const PostBodyWrapper = styled.View`
  margin-top: 3;
`

const PostThumbnailsWrapper = styled.ScrollView`
  margin-top: 3;
`

const PostThumbnailWrapper = styled.View`
  margin-right: 6;
`

const PostFooterWrapper = styled.View`
  margin-top: 3;
`

export const PostView: React.FC<{ post: Post }> = React.memo(({ post }) => {
  const { appViaEnabled, postAvatarSize } = usePreference()
  const { navigateToFileModal } = useTimelineActions()
  const avatarVariant = post.user.avatarFile && post.user.avatarFile.thumbnailVariant
  const avatarThumbnailUri = (avatarVariant && avatarVariant.url) || undefined

  const avatarWrapperStyle = createAvatarWrapperStyle(postAvatarSize)

  return (
    <PostViewWrapper>
      <View style={avatarWrapperStyle}>
        <Avatar name={post.user.name} thumbnailUri={avatarThumbnailUri} />
      </View>
      <PostContentWrapper>
        <Header name={post.user.name} screenName={post.user.screenName} createdAt={post.createdAt} />

        {post.text.length > 0 && (
          <PostBodyWrapper>
            <Body text={post.text} />
          </PostBodyWrapper>
        )}

        {post.files && post.files.length > 0 && (
          <PostThumbnailsWrapper horizontal>
            {post.files.map((file, i) => {
              if (!file.isImageFile() && !file.isVideoFile()) return null
              const thumbnail = file.thumbnailVariant
              if (thumbnail == null) return null
              const thumbnailUrl = thumbnail.url
              const onPress = () => navigateToFileModal(post.files, i)
              return (
                <PostThumbnailWrapper key={file.id}>
                  <Thumbnail type={file.type} thubmnailUri={thumbnailUrl} onPress={onPress} />
                </PostThumbnailWrapper>
              )
            })}
          </PostThumbnailsWrapper>
        )}
        {appViaEnabled && (
          <PostFooterWrapper>
            <Footer appName={post.application.name} appIsAutomated={post.application.isAutomated} />
          </PostFooterWrapper>
        )}
      </PostContentWrapper>
    </PostViewWrapper>
  )
})
