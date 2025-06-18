import { MyButton } from '../common/button'
import { router } from 'expo-router'
import { Image, Text, View } from 'react-native'

export function Hero() {
  return (
    <View className="flex-1 items-center justify-center min-h-[80vh] pb-10 relative">
      <Image
        source={require('@/assets/logo.png')}
        className="mt-14 w-40 h-12 max-w-[320px] max-h-[80px]"
        resizeMode="contain"
      />
      <View className="mt-5 text-center w-full items-center">
        <Text
          className="text-5xl text-white font-manropeBold text-center"
          style={{ maxWidth: 700, width: '90%' }}
        >
          Monitoramento de Talentos Esportivos
        </Text>
        <Text
          className="mt-4 text-2xl text-white font-interRegula text-center"
          style={{ maxWidth: 700, width: '90%' }}
        >
          Potencialize o futuro dos seus atletas! Centralize, acompanhe e
          transforme dados em desempenho esportivo. Uma plataforma inteligente
          para escolas, clubes e famílias que buscam excelência e crescimento
          seguro.
        </Text>
      </View>
      <View className="mt-5 flex-row gap-5">
        <MyButton
          title="REGISTRAR"
          onPress={() => router.navigate('/(auth)/register')}
        />
        <MyButton
          title="ENTRAR"
          onPress={() => router.navigate('/(auth)/login')}
        />
      </View>
    </View>
  )
}
