import React, { useCallback } from 'react'
import { useTheme, List, Divider, Caption } from 'react-native-paper'
import { Platform, View } from 'react-native'

type NonNull<A> = A extends undefined | null ? never : A

export type PreferenceItemProps = React.PropsWithChildren<React.PropTypeOf<typeof List.Item>>

const PreferenceItemAndroid = React.memo(({ children, ...rest }: PreferenceItemProps) => (
  <>
    <List.Item {...rest} />
    {children}
    <Divider />
  </>
))

const PreferenceItemIos = React.memo(
  ({
    children,
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
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          {description && typeof description === 'function' ? (
            description({} as any)
          ) : (
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
        {children}
        <Divider />
      </>
    )
  },
)

export const PreferenceItem = Platform.select({
  default: PreferenceItemIos,
  android: PreferenceItemAndroid,
})
