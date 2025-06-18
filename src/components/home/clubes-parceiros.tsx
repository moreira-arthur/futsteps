import { FlatList, Image, Text, View } from 'react-native'

const CLUBS = [
  { name: 'Barcelona', image: require('@/assets/clubs/barcelona.png') },
  { name: 'Real Madrid', image: require('@/assets/clubs/real-madrid.png') },
  {
    name: 'Manchester United',
    image: require('@/assets/clubs/manchester-united.png'),
  },
  { name: 'Chelsea', image: require('@/assets/clubs/chelsea.png') },
  { name: 'Liverpool', image: require('@/assets/clubs/liverpool.png') },
  { name: 'Arsenal', image: require('@/assets/clubs/arsenal.png') },
  { name: 'Tottenham', image: require('@/assets/clubs/tottenham-hotspur.png') },
  { name: 'Atletico', image: require('@/assets/clubs/atletico-madrid.png') },
  { name: 'M. City', image: require('@/assets/clubs/manchester-city.png') },
  { name: 'Mallorca', image: require('@/assets/clubs/mallorca.png') },
]

export function ClubesParceiros({
  isMobile,
  width,
}: { isMobile: boolean; width: number }) {
  return (
    <View className="w-full bg-gr-900 py-12 px-2 items-center">
      <Text className="text-4xl text-yl-400 font-manropeBold text-center mb-10">
        CLUBES PARCEIROS
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FlatList
          data={CLUBS}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={item => item.name}
          contentContainerStyle={{
            gap: 32,
            paddingHorizontal: isMobile ? 12 : 24,
            alignItems: 'center',
            justifyContent: isMobile ? 'flex-start' : 'center',
            minWidth: isMobile ? width * 1.2 : undefined,
          }}
          renderItem={({ item }) => (
            <View className="items-center justify-center">
              <Image
                source={item.image}
                style={{ width: 72, height: 72, maxWidth: 80, maxHeight: 80 }}
                resizeMode="contain"
              />
            </View>
          )}
          style={{ maxWidth: isMobile ? '100%' : 1050, alignSelf: 'center' }}
          snapToAlignment={isMobile ? undefined : 'center'}
          decelerationRate={isMobile ? 'fast' : undefined}
          snapToInterval={isMobile ? 104 : undefined}
        />
      </View>
    </View>
  )
}
