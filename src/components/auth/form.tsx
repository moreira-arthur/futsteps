import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { MyButton } from '../button'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: { name: string; email?: string; password: string }) => void
}

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const nameValid = name.length > 2
  const emailValid = mode === 'login' || validateEmail(email)
  const passwordValid = password.length >= 6

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
        className={`w-full rounded-xl px-4 py-3 text-lg border ${nameValid ? 'bg-gr-800 text-white border-gr-600' : 'bg-gr-800 text-red-400 border-red-400'}`}
      />
      {mode === 'register' && (
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          className={`w-full rounded-xl px-4 py-3 text-lg border ${emailValid ? 'bg-gr-800 text-white border-gr-600' : 'bg-gr-800 text-red-400 border-red-400'}`}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        className={`w-full rounded-xl px-4 py-3 text-lg border ${passwordValid ? 'bg-gr-800 text-white border-gr-600' : 'bg-gr-800 text-red-400 border-red-400'}`}
        secureTextEntry
      />
      <MyButton
        title={mode === 'login' ? 'ENTRAR' : 'REGISTRAR'}
        onPress={() => onSubmit({ name, email, password })}
      />
    </View>
  )
}
