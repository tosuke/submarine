import React, { useRef, useCallback } from 'react'
import { Observable, Subject } from 'rxjs'
import { MainView } from './MainView'
import { storiesOf } from '@storybook/react-native'

const Simple = () => <MainView authorizing={false} authorize={() => {}} invalidCodeErrorEvent={new Observable()} />
const Loading = () => <MainView authorizing={true} authorize={() => {}} invalidCodeErrorEvent={new Observable()} />
const InvalidCodeError = () => {
  const { current: event } = useRef(new Subject<void>())
  const authorize = useCallback(() => event.next(), [])
  return <MainView authorizing={false} authorize={authorize} invalidCodeErrorEvent={event} />
}

storiesOf('AuthorizeWithCodeScreen', module)
  .add('Simple', () => <Simple />)
  .add('Loading', () => <Loading />)
  .add('InvalidCodeError', () => <InvalidCodeError />)
