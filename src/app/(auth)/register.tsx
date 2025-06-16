import AuthForm from '@/components/auth/form'
import { FutstepsBackground } from '@/components/futsteps-background'
import { LogoFut } from '@/components/logo-fut'
import ScreenContainer from '@/components/screen-container'
import { router } from 'expo-router'
import { View, useWindowDimensions } from 'react-native'

export default function Register() {
  const { width } = useWindowDimensions()
  return (
    <ScreenContainer>
      <FutstepsBackground width={width} />
      <View
        className="flex-1 items-center justify-center gap-10"
        style={{ zIndex: 1 }}
      >
        <LogoFut />
        <AuthForm
          mode="register"
          onSubmit={() => router.navigate('/(tabs)/home')}
        />
      </View>
    </ScreenContainer>
  )
}
