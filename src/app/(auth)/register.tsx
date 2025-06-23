import { getUsers, saveUser } from '@/lib/storage'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, Text, View, useWindowDimensions } from 'react-native'
import AuthForm from '../../components/auth/form'
import ScreenContainer from '../../components/common/screen-container'
import { useToast } from '../../components/common/toast-provider'
import { FutstepsBackground } from '../../components/layout/futsteps-background'
import { LogoFut } from '../../components/layout/logo-fut'

export default function Register() {
  const { width } = useWindowDimensions()
  const { showToast } = useToast()

  async function handleRegister(data: {
    name: string
    email?: string
    password: string
  }) {
    if (!data.email) return
    const users = await getUsers()
    if (users.some(u => u.email === data.email)) {
      showToast('E-mail já cadastrado!', 'error')
      return
    }
    await saveUser({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    showToast('Cadastro realizado com sucesso!', 'success')
    setTimeout(() => router.replace('/(auth)/login'), 1200)
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
      <View
        className="flex-1 items-center justify-center gap-10"
        style={{ zIndex: 1 }}
      >
        <LogoFut />
        <AuthForm mode="register" onSubmit={handleRegister} />
      </View>
    </ScreenContainer>
  )
}
