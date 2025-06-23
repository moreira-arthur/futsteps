import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: '#FFCC26',
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTitleStyle: {
          fontFamily: 'Manrope_600SemiBold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ title: 'Voltar', headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Voltar', headerShown: false }}
      />

      {/* As demais telas herdarão headerShown: true por padrão */}
    </Stack>
  )
}
