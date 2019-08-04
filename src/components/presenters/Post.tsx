import React from 'react'
import { View, Image, ImageStyle, ViewStyle, TextStyle } from 'react-native'
import { Text, Caption, Paragraph } from 'react-native-paper'
import { Post as PostType, File as FileType } from '../../models'

const avatarStyle: ImageStyle = {
  marginRight: 4,
  borderRadius: 4,
  width: 32,
  height: 32,
}

const AvatarImage: React.FC<{ avatarFile: FileType }> = ({ avatarFile }) => {
  const variant = avatarFile.variants.find(v => v.type === 'thumbnail' && v.extension !== 'webp')!
  return <Image style={avatarStyle} source={{ uri: variant.url, width: 32, height: 32 }} />
}

const avatarTextViewStyle: ViewStyle = {
  ...avatarStyle,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
}

const avatarTextTextStyle: TextStyle = {
  color: '#fff',
  fontSize: 16,
  lineHeight: 32,
}

const AvatarText: React.FC<{ text: string }> = ({ text }) => (
  <View style={avatarTextViewStyle}>
    <Text style={avatarTextTextStyle}>{text}</Text>
  </View>
)

const fileImageStyle: ImageStyle = {
  marginRight: 4,
  borderRadius: 4,
}

const File: React.FC<{ file: FileType }> = ({ file }) => {
  const variant = file.variants.find(v => v.type === 'thumbnail' && v.extension !== 'webp')!
  return <Image style={fileImageStyle} source={{ uri: variant.url, width: 128, height: 128 }} />
}

const postViewStyle: ViewStyle = {
  paddingVertical: 5,
  flex: 1,
  flexDirection: 'row',
}

const postBodyViewStyle: ViewStyle = {
  flex: 1,
}

const postStatusViewStyle: ViewStyle = {
  flexDirection: 'row',
}

const postStatusTextStyle: TextStyle = {
  marginRight: 5,
  fontSize: 14,
}

const postStatusScreenNameTextStyle: TextStyle = {
  ...postStatusTextStyle,
  fontWeight: 'bold',
}

const postContentTextStyle: TextStyle = {
  marginVertical: 0,
}

const postFileViewStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
}

export const Post: React.ComponentType<{ post: PostType; relativeTime: string }> = ({ post, relativeTime }) => (
  <View style={postViewStyle}>
    {post.user.avatarFile ? <AvatarImage avatarFile={post.user.avatarFile} /> : <AvatarText text={post.user.name[0]} />}
    <View style={postBodyViewStyle}>
      <View style={postStatusViewStyle}>
        <Text style={postStatusScreenNameTextStyle}>{post.user.name}</Text>
        <Text style={postStatusTextStyle}>@{post.user.screenName}</Text>
      </View>
      <Paragraph style={postContentTextStyle} selectable={true}>
        {post.text}
      </Paragraph>
      <View style={postFileViewStyle}>
        {post.files.map(file => (
          <File key={file.id} file={file} />
        ))}
      </View>
      <Caption style={postContentTextStyle}>
        via {post.application.name}
        {post.application.isAutomated ? '[BOT]' : null}
      </Caption>
    </View>
    <Text>{relativeTime}</Text>
  </View>
)
