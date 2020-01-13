import $, { Transformer, ok, error, ValidationError } from 'transform-ts'
import { Platform } from 'react-native'
import parseText from '@linkage-community/bottlemail'
import * as punycode from 'punycode'
import * as pictograph from 'pictograph'
import dayjs, { Dayjs } from 'dayjs'
import { Client, File, ImageFile, VideoFile, NormalFile, User, Post, PostBody } from '../../resources/model'
import { withResult } from './utils'

const stringToISO8601 = Transformer.from<string, Dayjs>(str => {
  const date = new Date(str)
  if (Number.isNaN(date as any)) return error(ValidationError.from(new Error('Invalid Date Format')))
  return ok(dayjs(date))
})

export const ClientTransformer: Transformer<unknown, Client> = $.obj({
  id: $.number,
  name: $.string,
  isAutomated: $.optional($.boolean),
}).compose(
  Transformer.from(({ id, name, isAutomated }) =>
    ok({
      id: `${id}`,
      name,
      isBot: isAutomated == null ? false : isAutomated,
    }),
  ),
)

const FileJSONTransformer = $.obj({
  id: $.number,
  name: $.string,
  type: $.string,
  variants: $.array(
    $.obj({
      id: $.number,
      score: $.number,
      extension: $.string,
      type: $.string,
      size: $.number,
      url: $.string,
      mime: $.string,
    }),
  ),
})

type FileJSON = Transformer.TypeOf<typeof FileJSONTransformer>

const selectProperVariants = (variants: FileJSON['variants']) =>
  variants.filter(v => {
    if (Platform.OS === 'android') {
      return ['image/webp', 'image/png', 'image/jpeg'].includes(v.mime)
    } else {
      return ['image/png', 'image/jpeg'].includes(v.mime)
    }
  })

const FileJSONToImageFile = Transformer.from<FileJSON, ImageFile>(json => {
  if (json.type !== 'image') return error(ValidationError.from('Invalid Type'))
  const properVariants = selectProperVariants(json.variants.sort((l, r) => r.score - l.score))
  if (properVariants.length === 0) return error(ValidationError.from(new Error('Drawable Variant is not found')))
  const imageVariant = properVariants[0]
  const thumbnailVariant = properVariants.find(v => v.type === 'thumbnail') || imageVariant
  return ok({
    type: 'image' as const,
    id: `${json.id}`,
    url: imageVariant.url,
    thumbnailUrl: thumbnailVariant.url,
  })
})

const ImageFileTransformer = FileJSONTransformer.compose(FileJSONToImageFile)

const FileJSONToVideoFile = Transformer.from<FileJSON, VideoFile>(json => {
  if (json.type !== 'video') return error(ValidationError.from('Invalid Type'))
  const sortedVariants = json.variants.sort((l, r) => r.score - l.score)
  const imageVariants = selectProperVariants(sortedVariants)
  if (imageVariants.length === 0) return error(ValidationError.from(new Error('No Image Variant found')))
  const thumbnailVariant = imageVariants.find(v => v.type === 'thumbnail') || imageVariants[0]
  const videoVariant = sortedVariants.find(v => v.type === 'video')
  if (videoVariant == null) return error(ValidationError.from(new Error('No Video Variant found')))
  return ok({
    type: 'video' as const,
    id: `${json.id}`,
    url: videoVariant.url,
    thumbnailImageUrl: thumbnailVariant.url,
  })
})

const FileJSONToNormalFile = Transformer.from<FileJSON, NormalFile>(json => {
  if (json.variants.length === 0) return error(ValidationError.from(new Error('No variant found')))
  return ok({
    type: 'normal' as const,
    id: `${json.id}`,
    url: json.variants[0].url,
  })
})

export const FileTransformer: Transformer<unknown, File> = FileJSONTransformer.compose(
  $.either(FileJSONToImageFile, FileJSONToVideoFile, FileJSONToNormalFile),
)

export const UserTransformer: Transformer<unknown, User> = $.obj({
  id: $.number,
  name: $.string,
  screenName: $.string,
  postCount: $.number,
  createdAt: $.string.compose(stringToISO8601),
  updatedAt: $.string.compose(stringToISO8601),
  avatarFile: $.nullable(ImageFileTransformer),
}).compose(
  Transformer.from(({ id, name, screenName, avatarFile }) =>
    ok({
      id: `${id}`,
      name,
      screenName,
      avatar: avatarFile || undefined,
    }),
  ),
)

const stringToPostBody = Transformer.from<string, PostBody>(text => {
  const tokens = parseText(text.trim())
  const postBody: PostBody = tokens.map<PostBody[number]>(token => {
    switch (token.kind) {
      case 'Text':
        return { kind: 'text', value: token.value }
      case 'EmojiName':
        return { kind: 'text', value: pictograph.dic[token.value] || token.raw }
      case 'Mention':
        return { kind: 'bold', children: [{ kind: 'text', value: `@${token.value}` }] }
      case 'Link':
        try {
          const url = new URL(token.value)
          const originLen = url.origin.length
          const origin = `${url.protocol}//${punycode.toUnicode(url.host)}`
          const rest = decodeURI(token.value.slice(originLen))
          return {
            kind: 'link',
            url: token.value,
            children: [{ kind: 'text', value: origin + rest }],
          }
        } catch {
          return {
            kind: 'text',
            value: token.value,
          }
        }
      default:
        const exaustiveCheckedToken: never = token
        throw new Error(`Invalid Case: ${exaustiveCheckedToken}`)
    }
  })
  return ok(postBody)
})

export const PostTransformer: Transformer<unknown, Post> = $.obj({
  id: $.number,
  text: $.string.compose(stringToPostBody),
  user: UserTransformer,
  application: ClientTransformer,
  createdAt: $.string.compose(stringToISO8601),
  updatedAt: $.string.compose(stringToISO8601),
  files: $.array(withResult(FileTransformer)).compose(
    Transformer.from(results => ok(results.flatMap(result => (result.type === 'ok' ? [result.value] : [])))),
  ),
}).compose(
  Transformer.from(({ id, user, application: client, text: body, files, createdAt, updatedAt }) =>
    ok({
      id: `${id}`,
      author: {
        user,
        client,
      },
      body,
      files,
      createdAt,
      updatedAt,
    }),
  ),
)
