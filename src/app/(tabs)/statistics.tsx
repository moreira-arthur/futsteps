import ScreenContainer from '@/components/screen-container'
import { Image, Text, View } from 'react-native'

export default function Statistics() {
  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center flex-row gap-10">
        <Image
          source={require('@/assets/logo.png')}
          className=" w-48 h-14 max-w-48 max-h-14"
          resizeMode="contain"
        />
        <Text className="text-yl-400 text-xl font-manropeBold">
          Voce chegou as Estatísticas
        </Text>
      </View>
    </ScreenContainer>
  )
}
