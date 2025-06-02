import { View } from 'react-native'

export default function ScreenContainer({
  children,
}: { children: React.ReactNode }) {
  return <View className="flex-1 bg-gr-900">{children}</View>
}
