import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet, FlatList } from 'react-native'
import { Post, User, Application, File } from '../../../models'
import { Subject, BehaviorSubject } from 'rxjs'
import { TimelineBloc } from '../../../blocs_old/publicTimelineBloc'
import { useTimeline } from './'
import { ScreenView } from '../../design'

const avatar = new File(1, 'iona_v2.png', 'image', [
  {
    id: 0,
    score: 0,
    extension: 'png',
    type: 'thumbnail',
    size: 0,
    mime: 'image/png',
    url: 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2_x128.png',
  },
  {
    id: 1,
    score: 0,
    extension: 'png',
    type: 'image',
    size: 0,
    mime: 'image/png',
    url: 'https://storage.googleapis.com/static.tosukeapps.tk/iona_v2.png',
  },
])

const user = new User(0, 'John Doe', 'john', 100, new Date(), new Date(), avatar)

const app = new Application(0, 'test', false)

const post = (id: number) => new Post(id, `test${id}`, user, app, new Date(), new Date(), [])

const tlBloc: TimelineBloc = {
  fetchLatestPosts$: new Subject<void>(),
  fetchMorePosts$: new Subject<void>(),
  scrollToTop$: new Subject<void>(),
  posts$: new BehaviorSubject(Array.from(new Array(100), (_, i) => post(i))),
  isFetchingLatestPosts$: new BehaviorSubject(false),
  isFetchingMorePosts$: new BehaviorSubject(false),
  connectedToSocket$: new BehaviorSubject(true),
  scrollToTopEvent$: new Subject<void>(),
}

const Simple = () => {
  const { flatListRef, flatListProps } = useTimeline({
    timelineBloc: tlBloc,
    navigateToFileModal: () => {},
    openUrl: () => {},
  })
  return (
    <ScreenView style={StyleSheet.absoluteFill}>
      <FlatList ref={flatListRef} {...flatListProps} />
    </ScreenView>
  )
}

storiesOf('useTimeline', module).add('Simple', () => <Simple />)
