import { Image, ImageBackground, Text, View } from 'react-native'

export default function Index() {
  return (
    <ImageBackground
      source={require('@/assets/bg.png')}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/logo.png')}
          className=" mt-14 w-60 h-16"
          resizeMode="contain"
        />
        <View className="mt-5 text-center">
          <Text className="text-5xl text-white font-manropeBold text-center">
            Monitoramento de Talentos Esportivos
          </Text>
          <Text className="mt-4 text-2xl text-white font-interRegula text-center">
            Centralize e acompanhe o desempenho dos seus atletas em uma
            plataforma única e inteligente, transformando dados em potencial
            esportivo!
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}
