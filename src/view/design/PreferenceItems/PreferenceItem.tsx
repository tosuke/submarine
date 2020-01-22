import React, { useCallback } from 'react'
import { useTheme, List, Divider, Caption } from 'react-native-paper'
import { Platform, View } from 'react-native'

type NonNull<A> = A extends undefined | null ? never : A

export type PreferenceItemProps = React.PropTypeOf<typeof List.Item>

const PreferenceItemAndroid = React.memo((props: PreferenceItemProps) => (
  <>
    <List.Item {...props} />
    <Divider />
  </>
))

const PreferenceItemIos = React.memo(
  ({
    description,
    descriptionEllipsizeMode,
    descriptionNumberOfLines,
    descriptionStyle,
    right,
    ...rest
  }: PreferenceItemProps) => {
    const theme = useTheme()
    const rightBlock = useCallback<NonNull<PreferenceItemProps['right']>>(
      props => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {description && (
            <Caption
              style={[{ marginVertical: 4, fontSize: 16 }, descriptionStyle]}
              numberOfLines={descriptionNumberOfLines}
              ellipsizeMode={descriptionEllipsizeMode}
            >
              {description}
            </Caption>
          )}
          {right && right(props)}
        </View>
      ),
      [description, descriptionNumberOfLines, descriptionEllipsizeMode, descriptionStyle, right],
    )
    return (
      <>
        <List.Item {...rest} style={[{ backgroundColor: theme.colors.surface }, rest.style]} right={rightBlock} />
        <Divider />
      </>
    )
  },
)

export const PreferenceItem = Platform.select({
  default: PreferenceItemIos,
  android: PreferenceItemAndroid,
})
