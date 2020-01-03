import React, { useCallback, useRef, forwardRef, useMemo, useImperativeHandle, useEffect } from 'react'
import styled from 'styled-components/native'
import {
  Animated,
  Platform,
  StyleSheet,
  FlatList,
  View,
  FlatListProps,
  RefreshControl,
  RefreshControlProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { Appbar } from 'react-native-paper'
import { Header as NavigationHeader } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { useObservable } from '../../../hooks/useObservable'
import { ScreenView, AppHeader, PrimaryFAB } from '../../design'
import { TimelineBlocContext } from '../../../hooks/inject'
import { useTimeline } from '../../modules/useTimeline'
import { File, Post } from '../../../models'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useTheme } from '../../../hooks/useTheme'

const HEADER_HEIGHT = NavigationHeader.HEIGHT

export const Header: React.FC<{ onTouchEnd?: () => void; connectedToStream?: boolean }> = ({
  onTouchEnd,
  connectedToStream,
}) => (
  <AppHeader style={{ zIndex: 1 }} onTouchEnd={onTouchEnd}>
    <Appbar.Content title="ホーム" />
    <Appbar.Action icon="wifi" disabled={!connectedToStream} />
  </AppHeader>
)

const SendIconAtom = styled(MaterialIcons)`
  padding-left: 3;
`

const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size, color }) => (
  <SendIconAtom name="send" size={size} color={color} />
)

export const FAB: React.FC<{ onPress?: () => void }> = ({ onPress }) => <PrimaryFAB icon={SendIcon} onPress={onPress} />

const AnimatedFlatList = forwardRef((props: FlatListProps<Post>, ref: React.Ref<FlatList<Post>>) => {
  const nodeRef = useRef<{ node: FlatList<Post> | null }>({ node: null })
  useImperativeHandle(ref, () => nodeRef.current.node!)

  const animatedRefCallback = useCallback(
    (node: { getNode(): FlatList<Post> | null } | null) => {
      if (node == null) return
      nodeRef.current.node = node.getNode()
    },
    [nodeRef],
  )

  return <Animated.FlatList ref={animatedRefCallback} {...props} />
})

const useAnimatedSnapshotRef = (node: Animated.AnimatedWithChildren) => {
  const ref = useRef<number>()
  useEffect(() => {
    const id = node.addListener(({ value }) => {
      ref.current = value
    })
    return () => node.removeListener(id)
  }, [node])
  return ref
}

export const MainView: React.FC<{
  timelineBloc: TimelineBloc
  onPostButtonPress: () => void
  navigateToFileModal: (files: File[], index: number) => void
  openUrl: (url: string) => void
}> = ({ timelineBloc, onPostButtonPress, navigateToFileModal, openUrl }) => {
  const statusBarHeight = getStatusBarHeight()

  const TimelineRefreshControl = useCallback(
    (props: RefreshControlProps) => <RefreshControl {...props} progressViewOffset={HEADER_HEIGHT + statusBarHeight} />,
    [statusBarHeight],
  )

  const { flatListRef, flatListProps } = useTimeline({
    timelineBloc,
    navigateToFileModal,
    openUrl,
    RefreshControl: TimelineRefreshControl,
  })

  const scrollToTop = useCallback(() => {
    if (flatListRef.current == null) return
    flatListRef.current.scrollToIndex({
      index: 0,
      viewOffset: HEADER_HEIGHT + statusBarHeight,
      animated: true,
    })
  }, [flatListRef])

  const connected = useObservable(() => timelineBloc.connectedToSocket$, false, [timelineBloc])

  const { current: scrollY } = useRef(new Animated.Value(0))
  const { current: headerY } = useRef(Animated.diffClamp(Animated.multiply(-1, scrollY), -HEADER_HEIGHT, 0))

  const scrollYRef = useAnimatedSnapshotRef(scrollY)
  const headerYRef = useAnimatedSnapshotRef(headerY)

  const onScroll = useMemo(
    () =>
      Animated.event<NativeSyntheticEvent<NativeScrollEvent>>(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true },
      ),
    [scrollY],
  )

  const moveHeader = useCallback(
    (offset: number) => {
      if (headerYRef.current == null || flatListRef.current == null) return
      if (headerYRef.current > -HEADER_HEIGHT / 2) {
        flatListRef.current.scrollToOffset({
          offset: offset + headerYRef.current,
          animated: true,
        })
      } else {
        flatListRef.current.scrollToOffset({
          offset: offset + (HEADER_HEIGHT + headerYRef.current),
          animated: true,
        })
      }
    },
    [headerYRef, flatListRef],
  )

  const onMomentumScrollEnd = useCallback(
    (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = ev.nativeEvent.contentOffset.y
      moveHeader(offset)
    },
    [moveHeader],
  )

  const timerRef = useRef<number>()

  const onScrollEndDrug = useCallback(() => {
    // @types/node が依存関係に混入していて型が汚染されているので、無理矢理通す
    timerRef.current = (setTimeout(() => {
      moveHeader(scrollYRef.current!)
    }, 200) as unknown) as number
  }, [timerRef, scrollYRef, moveHeader])

  const onMomentumScrollBegin = useCallback(() => {
    clearTimeout(timerRef.current)
  }, [timerRef])

  const theme = useTheme()

  const HeaderAndFAB = (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: statusBarHeight,
          backgroundColor: theme.colors.background,
          zIndex: 3,
        }}
      />
      <Animated.View
        style={{
          transform: [
            {
              translateY: headerY,
            },
          ],
          zIndex: 2,
        }}
      >
        <Header onTouchEnd={scrollToTop} connectedToStream={connected} />
      </Animated.View>
      <FAB onPress={onPostButtonPress} />
    </>
  )

  return (
    <TimelineBlocContext.Provider value={timelineBloc}>
      {Platform.OS !== 'android' && HeaderAndFAB}
      <ScreenView style={StyleSheet.absoluteFill}>
        {Platform.OS === 'android' && HeaderAndFAB}
        <AnimatedFlatList
          ref={flatListRef}
          {...flatListProps}
          bounces={false}
          overScrollMode="never"
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{
            paddingTop: HEADER_HEIGHT + getStatusBarHeight(),
          }}
          ListFooterComponentStyle={{ paddingBottom: HEADER_HEIGHT }}
          onScroll={onScroll}
          onScrollEndDrag={onScrollEndDrug}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
        />
      </ScreenView>
    </TimelineBlocContext.Provider>
  )
}
