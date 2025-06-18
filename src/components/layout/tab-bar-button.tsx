import { type ReactNode, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Icons } from './icons'

interface TabBarButtonProps {
  isFocused: boolean
  label: string | ReactNode
  routeName: string
  color: string
  onPress?: () => void
  onLongPress?: () => void
  accessibilityLabel?: string
  testID?: string
  //   [key: string]: any // for additional props like onPress, etc.
}

export function TabBarButton(props: TabBarButtonProps) {
  const { isFocused, label, routeName, color } = props

  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    )
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    }
  })
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return {
      // styles
      opacity,
    }
  })
  return (
    <Pressable
      {...props}
      className="flex-1 bg-black justify-center items-center py-2 gap-1 rounded-3xl"
    >
      <Animated.View style={[animatedIconStyle]}>
        {Icons(routeName, props)}
      </Animated.View>

      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  )
}
