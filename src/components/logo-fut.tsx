import { Image } from 'react-native'

export function LogoFut() {
  return (
    <Image
      source={require('@/assets/logo.png')}
      className=" w-48 h-14 max-w-48 max-h-14"
      resizeMode="contain"
    />
  )
}
