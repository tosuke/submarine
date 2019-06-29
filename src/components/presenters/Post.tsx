import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text, Caption, Paragraph } from 'react-native-paper'
import { Post as PostType, File as FileType } from '../../models'

const styles = StyleSheet.create({
  avatar: {
    marginRight: 4,
    borderRadius: 4,
    width: 32,
    height: 32,
  },
  post: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
  },
  postBody: {
    flex: 1,
    flexDirection: 'column',
  },
  postStatusView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postStatusNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatusNameText: {
    marginRight: 5,
    fontSize: 14,
  },
  postStatusScreenNameText: {
    fontWeight: '200',
  },
  postText: {
    flex: 1,
  },
})

const AvatarImage: React.FC<{ avatarFile: FileType }> = ({ avatarFile }) => {
  const variant = avatarFile.variants.find(v => v.type === 'thumbnail' && v.extension !== 'webp')!
  return <Image style={styles.avatar} source={{ uri: variant.url, width: 32, height: 32 }} />
}

const AvatarText: React.FC<{ text: string }> = ({ text }) => (
  <View style={[styles.avatar, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}>
    <Text style={{ color: '#fff', fontSize: 16, lineHeight: 32 }}>{text}</Text>
  </View>
)

const File: React.FC<{ file: FileType }> = ({ file }) => {
  const variant = file.variants.find(v => v.type === 'thumbnail' && v.extension !== 'webp')!
  return <Image style={{ marginRight: 4, borderRadius: 4 }} source={{ uri: variant.url, width: 128, height: 128 }}/>
}

export const Post: React.ComponentType<{ post: PostType }> = ({ post }) => (
  <View style={styles.post}>
    {post.user.avatarFile ? <AvatarImage avatarFile={post.user.avatarFile} /> : <AvatarText text={post.user.name[0]} />}
    <View style={styles.postBody}>
      <View style={styles.postStatusView}>
        <View style={styles.postStatusNameView}>
          <Text style={[styles.postStatusNameText, { fontWeight: 'bold' }]}>{post.user.name}</Text>
          <Text style={styles.postStatusNameText}>@{post.user.screenName}</Text>
        </View>
        <Text>ms</Text>
      </View>
      <Paragraph style={{ marginVertical: 0 }} selectable={true}>
        {post.text}
      </Paragraph>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {post.files.map(file => (
          <File key={file.id} file={file} />
        ))}
      </View>
      <Caption style={{ marginVertical: 0 }}>
        via {post.application.name}
        {post.application.isAutomated ? '[BOT]' : null}
      </Caption>
    </View>
  </View>
)
