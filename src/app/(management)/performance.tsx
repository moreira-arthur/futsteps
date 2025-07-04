import React from 'react'
import { Text, View } from 'react-native'
import ScreenContainer from '../../components/common/screen-container'

export default function Performance() {
  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center">
        <Text className="text-zinc-100 text-xl font-manropeBold">
          Registrar Performance
        </Text>
      </View>
    </ScreenContainer>
  )
}
