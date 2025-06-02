import { AntDesign, Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TabBarButton } from './tab-bar-button'

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const primaryColor = '#FFCC26'
  const secondaryColor = '#876803'
  return (
    <View className="flex bottom-3 flex-row bg-gr-1100  items-center justify-between gap-1 mx-3 px-6 rounded-3xl shadow-sm shadow-yl-100">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const rawLabel = options.tabBarLabel ?? options.title ?? route.name

        const label =
          typeof rawLabel === 'function'
            ? route.name // ou qualquer fallback de string
            : String(rawLabel)
        if (['_sitemap', '+not-found'].includes(route.name)) return null

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name ? route.name : ''}
            color={isFocused ? primaryColor : secondaryColor}
            label={label}
          />
        )
      })}
    </View>
  )
}
