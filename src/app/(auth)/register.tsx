import { LogoFut } from '@/components/logo-fut'
import ScreenContainer from '@/components/screen-container'
import { Image, Text, View } from 'react-native'

export default function Register() {
  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center bg-color flex-row gap-10">
        <LogoFut />
        <Text className="text-yl-400 text-xl font-manropeBold">
          Voce chegou a tela de Registro
        </Text>
      </View>
    </ScreenContainer>
  )
}
