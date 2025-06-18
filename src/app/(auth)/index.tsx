import { ScrollView, View, useWindowDimensions } from 'react-native'
import { ClubesParceiros } from '../../components/home/clubes-parceiros'
import { Hero } from '../../components/home/hero'
import { PorqueEscolher } from '../../components/home/porque-escolher'
import { Footer } from '../../components/layout/footer'
import { FutstepsBackground } from '../../components/layout/futsteps-background'

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
