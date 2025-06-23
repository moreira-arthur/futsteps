import React, { useEffect } from 'react'
import { Animated, Dimensions, Pressable, Text, View } from 'react-native'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  visible: boolean
  onClose: () => void
}

const COLORS = {
  success: '#FFD600', // yl-400
  error: '#dc2626',
}

export default function Toast({
  message,
  type = 'success',
  visible,
  onClose,
}: ToastProps) {
  const [top] = React.useState(new Animated.Value(-100))

  useEffect(() => {
    if (visible) {
      Animated.timing(top, {
        toValue: 60,
        duration: 300,
        useNativeDriver: false,
      }).start()
      const timer = setTimeout(() => {
        onClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
    Animated.timing(top, {
      toValue: -100,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [visible, top, onClose])

  if (!visible) return null

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
      }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={onClose}
        style={{
          backgroundColor: COLORS[type],
          borderRadius: 12,
          paddingVertical: 16,
          paddingHorizontal: 32,
          minWidth: 220,
          maxWidth: Dimensions.get('window').width - 32,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <Text
          style={{
            color: type === 'success' ? '#18181b' : '#fff',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Manrope-Bold',
          }}
        >
          {message}
        </Text>
      </Pressable>
    </Animated.View>
  )
}
