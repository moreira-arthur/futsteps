import { ClubesParceiros } from '@/components/clubes-parceiros'
import { Footer } from '@/components/footer'
import { FutstepsBackground } from '@/components/futsteps-background'
import { Hero } from '@/components/hero'
import { PorqueEscolher } from '@/components/porque-escolher'
import { ScrollView, View, useWindowDimensions } from 'react-native'

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

export default function Index() {
  const { width } = useWindowDimensions()
  const isMobile = width < 700

  return (
    <View
      style={{
        flex: 1,
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: '#111111',
      }}
    >
      <FutstepsBackground width={width} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'transparent',
          zIndex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <PorqueEscolher isMobile={isMobile} />
        <ClubesParceiros isMobile={isMobile} width={width} />
        <Footer />
      </ScrollView>
    </View>
  )
}
