import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'

export function Footer() {
  return (
    <View
      className="w-full bg-gr-900 pt-12 pb-6 px-2 border-t border-gr-800 items-center"
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        className="w-full flex-row flex-wrap justify-center gap-12 mb-8"
        style={{ maxWidth: 1200 }}
      >
        {/* Suporte */}
        <View style={{ minWidth: 160, marginBottom: 16 }}>
          <Text className="text-white font-manropeBold text-lg mb-2">
            Suporte
          </Text>
          <Text className="text-white text-base mb-1">Central de Ajuda</Text>
          <Text className="text-white text-base mb-1">
            Informações de Segurança
          </Text>
          <Text className="text-white text-base mb-1">
            Opções de Cancelamento
          </Text>
        </View>
        {/* Empresa */}
        <View style={{ minWidth: 160, marginBottom: 16 }}>
          <Text className="text-white font-manropeBold text-lg mb-2">
            Empresa
          </Text>
          <Text className="text-white text-base mb-1">Sobre nós</Text>
          <Text className="text-white text-base mb-1">
            Políticas de Privacidade
          </Text>
          <Text className="text-white text-base mb-1">Blog da Comunidade</Text>
          <Text className="text-white text-base mb-1">Termos de Serviço</Text>
        </View>
        {/* Contato */}
        <View style={{ minWidth: 160, marginBottom: 16 }}>
          <Text className="text-white font-manropeBold text-lg mb-2">
            Contato
          </Text>
          <Text className="text-white text-base mb-1">FAQ</Text>
          <Text className="text-white text-base mb-1">Entre em contato</Text>
          <Text className="text-white text-base mb-1">Patrocinadores</Text>
        </View>
        {/* Social */}
        <View style={{ minWidth: 160, marginBottom: 16 }}>
          <Text className="text-white font-manropeBold text-lg mb-2">
            Social
          </Text>
          <View className="flex-row gap-4 mt-2">
            <TouchableOpacity
              onPress={() => Linking.openURL('https://facebook.com')}
            >
              <FontAwesome5 name="facebook" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://twitter.com')}
            >
              <Feather name="twitter" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://tiktok.com')}
            >
              <FontAwesome5 name="tiktok" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://youtube.com')}
            >
              <FontAwesome5 name="youtube" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        className="w-full flex-row items-center justify-between px-4"
        style={{ maxWidth: 1200 }}
      >
        <Text className="text-gr-600 text-center text-xs mt-2">
          © {new Date().getFullYear()} FutSteps. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  )
}
