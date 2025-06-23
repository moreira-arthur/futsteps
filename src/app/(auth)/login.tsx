import { getUsers } from '@/lib/storage'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import AuthForm from '../../components/auth/form'
import ScreenContainer from '../../components/common/screen-container'
import { useToast } from '../../components/common/toast-provider'
import { FutstepsBackground } from '../../components/layout/futsteps-background'
import { LogoFut } from '../../components/layout/logo-fut'

export default function Login() {
  const { width } = useWindowDimensions()
  const { showToast } = useToast()

  async function handleLogin(data: { email: string; password: string }) {
    const users = await getUsers()
    const user = users.find(u => u.email === data.email)
    if (!user) {
      showToast('Usuário não encontrado!', 'error')
      return
    }
    if (user.password !== data.password) {
      showToast('Senha incorreta!', 'error')
      return
    }
    showToast('Login realizado com sucesso!', 'success')
    setTimeout(() => router.replace('/(tabs)/home'), 1000)
  }

  return (
    <ScreenContainer>
      <FutstepsBackground width={width} />
      <View className="absolute top-10 left-4 z-10">
        <Pressable
          className="flex-row items-center bg-yl-400 rounded-lg px-4 py-2"
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#18181b" />
          <Text className="text-zinc-900 font-manropeBold ml-2 text-base">
            Voltar
          </Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, zIndex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <LogoFut />
          <AuthForm mode="login" onSubmit={handleLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}
