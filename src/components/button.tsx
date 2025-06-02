import { Pressable, Text } from 'react-native'

type MyButtonProps = {
  title: string
  onPress?: () => void
}

export function MyButton({ title, onPress }: MyButtonProps) {
  return (
    <Pressable
      className="bg-yl-400 shadow-lg shadow-black/25  px-6 py-2 rounded-md active:bg-yl-100"
      onPress={onPress}
    >
      <Text selectable={false} className="font-interBold text-xl text-center">
        {title}
      </Text>
    </Pressable>
  )
}
