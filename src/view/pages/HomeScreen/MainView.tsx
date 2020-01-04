import React, { useCallback, useRef, forwardRef, useMemo, useImperativeHandle } from 'react'
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
  ViewStyle,
} from 'react-native'
import { Header as NavigationHeader } from 'react-navigation'
import { useTheme } from 'react-native-paper'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { useObservable } from '../../../hooks/useObservable'
import { ScreenView } from '../../design'
import { TimelineBlocContext } from '../../../hooks/inject'
import { useTimeline } from '../../modules/useTimeline'
import { File } from '../../../models'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useAnimatedSnapshotRef } from '../../../hooks/animated'
import { Header } from './Header'
import { FAB } from './FAB'

const HEADER_HEIGHT = NavigationHeader.HEIGHT

const AnimatedFlatList: {
  new <A extends unknown>(props: FlatListProps<A> & React.RefAttributes<FlatList<A>>): FlatList<A>
} = forwardRef(<A extends unknown>(props: FlatListProps<A>, ref: React.Ref<FlatList<A>>) => {
  const nodeRef = useRef<{ node: FlatList<A> | null }>({ node: null })
  useImperativeHandle(ref, () => nodeRef.current.node!)

  const animatedRefCallback = useCallback(
    (node: { getNode(): FlatList<A> | null } | null) => {
      if (node == null) return
      nodeRef.current.node = node.getNode()
    },
    [nodeRef],
  )

  return <Animated.FlatList ref={animatedRefCallback} {...props} />
}) as any

const useCollapsibleHeader = <A extends unknown>(flatListRef: React.RefObject<FlatList<A>>) => {
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

  const onScrollEndDrag = useCallback(() => {
    // @types/node が依存関係に混入していて型が汚染されているので、無理矢理通す
    timerRef.current = (setTimeout(() => {
      moveHeader(scrollYRef.current!)
    }, 200) as unknown) as number
  }, [timerRef, scrollYRef, moveHeader])

  const onMomentumScrollBegin = useCallback(() => {
    clearTimeout(timerRef.current)
  }, [timerRef])

  const headerStyle = useMemo<ViewStyle>(
    () => ({
      transform: [
        {
          translateY: headerY as any,
        },
      ],
    }),
    [headerY],
  )

  return {
    headerStyle,
    flatListProps: {
      onScroll,
      onScrollEndDrag,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
    },
  }
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

  const { flatListProps: collapsibleHeaderFlatListProps, headerStyle } = useCollapsibleHeader(flatListRef)

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
        style={[
          {
            zIndex: 2,
          },
          headerStyle,
        ]}
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
          {...collapsibleHeaderFlatListProps}
        />
      </ScreenView>
    </TimelineBlocContext.Provider>
  )
}
