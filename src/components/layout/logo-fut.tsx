import { Image } from 'react-native'

export function LogoFut() {
  return (
    <Image
      source={require('@/assets/logo.png')}
      className="w-40 h-12 max-w-[320px] max-h-[80px]"
      resizeMode="contain"
    />
  )
}
