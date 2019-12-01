import React, { useRef, useMemo } from 'react'
import { View, StatusBar, ViewStyle, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Theme, withTheme, Appbar } from 'react-native-paper'
import { File } from '../../../models'
import { ScreenView } from '../../design/ScreenView'
import { ImageModal } from '../../molecules/ImageModal'
import { VideoModal } from '../../molecules/VideoModal'
import color from 'color'
import { FlatList, PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { Platform } from '@unimodules/core'

const { Value, event, block, cond, eq, greaterThan, set, multiply, abs, call } = Animated

const FileModal: React.FC<{ item: File }> = ({ item: file }) => {
  if (file.isImageFile()) {
    return <ImageModal key={file.id} imageUri={file.imageVariant.url} thumbnailUri={file.thumbnailVariant.url} />
  } else if (file.isVideoFile()) {
    return <VideoModal key={file.id} videoUri={file.videoVariant.url} thumbnailUri={file.thumbnailVariant.url} />
  } else {
    return null
  }
}

const keyExtractor = (file: File) => `${file.id}`

function useGestures({ back }: { back?: () => void }) {
  const panGestureHandlerRef = useRef<PanGestureHandler>(null)
  const { current: y } = useRef(new Value(0 as number))

  const { height } = Dimensions.get('screen')

  const handlePan = useMemo(
    () =>
      event([
        {
          nativeEvent: ({
            state,
            translationY,
          }: {
            state: Animated.Node<State>
            translationY: Animated.Node<number>
          }) =>
            block([
              cond(eq(state, State.ACTIVE), set(y, translationY)),
              cond(
                eq(state, State.END),
                cond(
                  greaterThan(abs(y), height * 0.15),
                  call([y], () => back && back()),
                  set(y, 0),
                ),
              ),
            ]),
        },
      ]),
    [height, back],
  )

  const headerAnimatedStyle = useMemo(
    () => ({
      transform: [{ translateY: multiply(-1, abs(y)) as any }],
    }),
    [],
  )

  const contentAnimatedStyle = {
    transform: [{ translateY: y as any }],
  }

  return {
    panGestureHandlerRef,
    handlePan,
    headerAnimatedStyle,
    contentAnimatedStyle,
  }
}

type Props = {
  files: File[]
  initialIndex?: number
  onBackButtonPress?: () => void
}

const FileModalScreenViewImpl: React.FC<Props & { theme: Theme }> = ({
  theme,
  files,
  initialIndex,
  onBackButtonPress,
}) => {
  const backButtonStyle: ViewStyle = {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: color(theme.colors.background)
      .alpha(0.5)
      .string(),
  }

  const { panGestureHandlerRef, handlePan, headerAnimatedStyle, contentAnimatedStyle } = useGestures({
    back: onBackButtonPress,
  })

  return (
    <ScreenView>
      {Platform.OS === 'ios' && <StatusBar hidden />}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: StatusBar.currentHeight,
          zIndex: 2,
          backgroundColor: theme.colors.background,
        }}
      />
      <Animated.View style={[{ position: 'absolute', top: getStatusBarHeight(), zIndex: 1 }, headerAnimatedStyle]}>
        {Platform.OS === 'android' ? (
          <Appbar.BackAction style={backButtonStyle} color={theme.colors.text} size={24} onPress={onBackButtonPress} />
        ) : (
          <Appbar.Action
            style={backButtonStyle}
            icon="close"
            color={theme.colors.text}
            size={24}
            onPress={onBackButtonPress}
          />
        )}
      </Animated.View>
      <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
        <PanGestureHandler
          ref={panGestureHandlerRef}
          onGestureEvent={handlePan}
          onHandlerStateChange={handlePan}
          maxPointers={1}
        >
          <Animated.View style={contentAnimatedStyle}>
            <FlatList
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              initialNumToRender={1}
              initialScrollIndex={initialIndex}
              pagingEnabled
              horizontal
              data={files}
              renderItem={FileModal}
              keyExtractor={keyExtractor}
              simultaneousHandlers={panGestureHandlerRef}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </ScreenView>
  )
}

export const MainView = withTheme(FileModalScreenViewImpl)
