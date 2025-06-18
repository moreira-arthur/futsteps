import { Loading } from '../components/common/loading'
import ScreenContainer from '../components/common/screen-container'
import '@/styles/global.css'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { Manrope_700Bold } from '@expo-google-fonts/manrope'
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { Slot } from 'expo-router'
import { StatusBar } from 'react-native'
import { ToastProvider } from '../components/common/toast-provider'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Manrope_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <ToastProvider>
      <ScreenContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Slot />
      </ScreenContainer>
    </ToastProvider>
  )
}
