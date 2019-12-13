import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { MainView } from './MainView'
import { Post, User, Application, File } from '../../../models'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { Subject, BehaviorSubject } from 'rxjs'

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

const post = (id: number) => new Post(id, 'test', user, app, new Date(), new Date(), [])

const tlBloc: TimelineBloc = {
  fetchLatestPosts$: new Subject<number>(),
  fetchMorePosts$: new Subject<number>(),
  scrollToTop$: new Subject<void>(),
  posts$: new BehaviorSubject(Array.from(new Array(100), (_, i) => post(i))),
  isFetchingLatestPosts$: new BehaviorSubject(false),
  isFetchingMorePosts$: new BehaviorSubject(false),
  connectedToSocket$: new BehaviorSubject(true),
  scrollToTopEvent$: new Subject<void>(),
}

storiesOf('HomeScreen', module).add('Simple', () => (
  <MainView timelineBloc={tlBloc} onPostButtonPress={() => {}} navigateToFileModal={() => {}} />
))
