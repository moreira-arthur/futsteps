import { MyButton } from '@/components/button'
import { LogoFut } from '@/components/logo-fut'
import ScreenContainer from '@/components/screen-container'
import { router } from 'expo-router'
import { Text, TextInput, View } from 'react-native'

export default function Login() {
  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center bg-color  gap-10">
        <LogoFut />
        <Text className="text-yl-400 text-xl font-manropeBold">
          Voce chegou a tela de Login
        </Text>
        <TextInput
          value="Digite seu nome"
          className=" flex bg-w-80 h-10 left-10 top-10  rounded-xl border-2 border-white text-white  "
        />
        <MyButton
          title="ENTRAR"
          onPress={() => router.navigate('/(tabs)/home')}
        />
      </View>
    </ScreenContainer>
  )
}
