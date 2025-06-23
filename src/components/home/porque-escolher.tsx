import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export function PorqueEscolher({ isMobile }: { isMobile: boolean }) {
  return (
    <View className="w-full bg-gr-900 py-12 px-2 items-center">
      <Text className="text-4xl text-yl-400 font-manropeBold text-center mb-10">
        Por que escolher o FutSteps ?
      </Text>
      <View
        className={
          isMobile
            ? 'flex-col items-center gap-8'
            : 'flex-row justify-center gap-10 flex-wrap'
        }
        style={{ width: '100%', maxWidth: 1200 }}
      >
        <View className="items-center max-w-xs min-w-xs flex-1 px-2">
          <View
            className="bg-yl-400 rounded-xl mb-4 items-center justify-center"
            style={{
              width: 64,
              height: 64,
              minWidth: 64,
              minHeight: 64,
              maxWidth: 64,
              maxHeight: 64,
            }}
          >
            <FontAwesome name="dollar" size={32} color="#111" />
          </View>
          <Text className="text-white font-manropeBold text-xl mb-2 text-center">
            Preços Acessíveis
          </Text>
          <Text className="text-white text-base text-center">
            Preço acessível e justo, pensado para escolas, clubes e famílias que
            buscam potencializar o crescimento de jovens atletas sem comprometer
            o orçamento.
          </Text>
        </View>
        <View className="items-center max-w-xs min-w-xs flex-1 px-2">
          <View
            className="bg-yl-400 rounded-xl mb-4 items-center justify-center"
            style={{
              width: 64,
              height: 64,
              minWidth: 64,
              minHeight: 64,
              maxWidth: 64,
              maxHeight: 64,
            }}
          >
            <MaterialIcons name="security" size={32} color="#111" />
          </View>
          <Text className="text-white font-manropeBold text-xl mb-2 text-center">
            Segurança dos Dados
          </Text>
          <Text className="text-white text-base text-center">
            São utilizadas as melhores práticas de segurança para garantir que
            todas as informações dos atletas, treinadores e gestores sejam
            armazenadas com total privacidade e proteção contra acessos não
            autorizados.
          </Text>
        </View>
        <View className="items-center max-w-xs min-w-xs flex-1 px-2">
          <View
            className="bg-yl-400 rounded-xl mb-4 items-center justify-center"
            style={{
              width: 64,
              height: 64,
              minWidth: 64,
              minHeight: 64,
              maxWidth: 64,
              maxHeight: 64,
            }}
          >
            <Ionicons name="speedometer-outline" size={32} color="#111" />
          </View>
          <Text className="text-white font-manropeBold text-xl mb-2 text-center">
            Interface Intuitiva
          </Text>
          <Text className="text-white text-base text-center">
            Plataforma intuitiva e de fácil uso, garantindo uma experiência
            fluida e eficiente para atletas, treinadores e gestores, do início
            ao fim.
          </Text>
        </View>
      </View>
    </View>
  )
}
