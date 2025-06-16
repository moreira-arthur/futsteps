import { MyButton } from '@/components/button'
import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: { name: string; email?: string; password: string }) => void
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View className="w-full max-w-md items-center gap-6">
      <Text className="text-3xl text-yl-400 font-manropeBold mb-2">
        {mode === 'login' ? 'Entrar na sua conta' : 'Criar uma nova conta'}
      </Text>
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        className="w-full bg-gr-800 text-white rounded-xl px-4 py-3 text-lg border border-gr-600"
      />
      {mode === 'register' && (
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          className="w-full bg-gr-800 text-white rounded-xl px-4 py-3 text-lg border border-gr-600"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        className="w-full bg-gr-800 text-white rounded-xl px-4 py-3 text-lg border border-gr-600"
        secureTextEntry
      />
      <MyButton
        title={mode === 'login' ? 'ENTRAR' : 'REGISTRAR'}
        onPress={() => onSubmit({ name, email, password })}
      />
    </View>
  )
}
