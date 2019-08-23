import React from 'react'
import { View, Image, ImageStyle, ViewStyle, TextStyle, ScrollView, ImageBackground } from 'react-native'
import { Text, TouchableRipple, Theme, withTheme } from 'react-native-paper'
import { Caption } from '../../atoms/Caption'
import { MaterialIcons } from '@expo/vector-icons'

const PostHeader: React.FC<{ name?: string; screenName?: string; relativeTime?: string; style?: ViewStyle }> = ({
  name,
  screenName,
  relativeTime,
  style,
}) => {
  const viewStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  }
  const textStyle: TextStyle = {
    fontSize: 14,
  }
  return (
    <View style={[style, viewStyle]}>
      <Text
        style={[textStyle, { flexShrink: 1, marginRight: 6, fontWeight: 'bold' }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
      <Caption style={[textStyle, { marginRight: 6 }]}>@{screenName}</Caption>
      <Caption style={[textStyle, { marginLeft: 'auto' }]}>{relativeTime}</Caption>
    </View>
  )
}

const PostAvatar: React.FC<{ userName?: string; thumbnailUri?: string; style?: ViewStyle; theme: Theme }> = ({
  userName,
  thumbnailUri,
  style,
  theme,
}) => {
  const backgroundColor = theme.dark ? '#000' : '#fff'
  const textColor = theme.dark ? '#fff' : '#000'

  const imageStyle: ImageStyle = {
    borderRadius: 4,
    width: 32,
    height: 32,
  }

  const viewStyle: ViewStyle = {
    borderRadius: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
  }

  return (
    <View style={[viewStyle, style]}>
      {thumbnailUri ? (
        <Image style={imageStyle} source={{ uri: thumbnailUri, width: 32, height: 32 }}></Image>
      ) : (
        <Text style={{ color: textColor, fontSize: 16, lineHeight: 32 }}>{(userName || ' ')[0]}</Text>
      )}
    </View>
  )
}

const PostThumbnail: React.FC<{
  type: 'image' | 'video'
  thumbnailUri: string
  onPress?: () => void
  style?: ViewStyle
}> = ({ type, thumbnailUri, onPress, style }) => {
  const viewStyle: ViewStyle = {
    borderRadius: 4,
    width: 128,
    height: 128,
  }

  return (
    <TouchableRipple style={[viewStyle, style]} onPress={onPress} borderless>
      <ImageBackground
        style={{ width: 128, height: 128, justifyContent: 'center', alignItems: 'center' }}
        source={{ uri: thumbnailUri, width: 128, height: 128 }}
      >
        {type === 'video' && (
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="play-circle-outline" size={32} color="#fff" />
          </View>
        )}
      </ImageBackground>
    </TouchableRipple>
  )
}

const PostFooter: React.FC<{ appName?: string; appIsBot?: boolean; style?: ViewStyle }> = ({
  appName,
  appIsBot,
  style,
}) => {
  const textStyle: TextStyle = {
    fontSize: 12,
  }
  return (
    <View style={[style, { flexDirection: 'row' }]}>
      <Caption style={textStyle}>via {appName}</Caption>
      {appIsBot && (
        <Caption
          style={[textStyle, { borderWidth: 1, borderRadius: 4, marginLeft: 2, paddingLeft: 3, paddingRight: 1 }]}
        >
          Bot
        </Caption>
      )}
    </View>
  )
}

export type ThumbnailProp = {
  type: 'image' | 'video'
  thumbnailUri: string
  onPress?: () => void
}

export type PostProps = Partial<{
  style: ViewStyle
  userName: string
  userScreenName: string
  avatarThumbnailUri: string
  relativeTime: string
  text: string
  thumbnails: readonly ThumbnailProp[]
  appName: string
  appIsAutomated: boolean
}>

const PostImpl: React.FC<PostProps & { theme: Theme }> = ({
  theme,
  style,
  userName,
  userScreenName,
  avatarThumbnailUri,
  relativeTime,
  text,
  thumbnails,
  appName,
  appIsAutomated,
}) => {
  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      <PostAvatar theme={theme} style={{ marginRight: 6 }} userName={userName} thumbnailUri={avatarThumbnailUri} />
      <View style={{ flex: 1 }}>
        <PostHeader name={userName} screenName={userScreenName} relativeTime={relativeTime} />
        <Text style={{ marginTop: 3 }} selectable={true}>
          {text}
        </Text>

        {thumbnails && thumbnails.length > 0 && (
          <ScrollView style={{ marginTop: 3 }} horizontal>
            {thumbnails.map(({ type, thumbnailUri, onPress }) => (
              <PostThumbnail
                key={thumbnailUri}
                style={{ marginRight: 6 }}
                type={type}
                thumbnailUri={thumbnailUri}
                onPress={onPress}
              />
            ))}
          </ScrollView>
        )}

        <PostFooter style={{ marginTop: 3 }} appName={appName} appIsBot={appIsAutomated} />
      </View>
    </View>
  )
}

export const Post = withTheme(React.memo(PostImpl))
