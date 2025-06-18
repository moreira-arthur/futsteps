import React, { useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'

const results = [
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Real Madrid',
    awayLogo: require('@/assets/clubs/real-madrid.png'),
    date: '10 Jul 2024',
    score: '2 x 2',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Chelsea',
    awayLogo: require('@/assets/clubs/chelsea.png'),
    date: '07 Jul 2024',
    score: '1 x 3',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Manchester City',
    awayLogo: require('@/assets/clubs/manchester-city.png'),
    date: '03 Jul 2024',
    score: '0 x 1',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Arsenal',
    awayLogo: require('@/assets/clubs/arsenal.png'),
    date: '30 Jun 2024',
    score: '2 x 0',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Sevilla',
    awayLogo: require('@/assets/clubs/sevilla-fc.png'),
    date: '27 Jun 2024',
    score: '1 x 1',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Valencia',
    awayLogo: require('@/assets/clubs/valencia-cf.png'),
    date: '24 Jun 2024',
    score: '3 x 2',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Atletico Madrid',
    awayLogo: require('@/assets/clubs/atletico-madrid.png'),
    date: '20 Jun 2024',
    score: '2 x 1',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Athletic Bilbao',
    awayLogo: require('@/assets/clubs/athletic-bilbao.png'),
    date: '17 Jun 2024',
    score: '0 x 0',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Villarreal',
    awayLogo: require('@/assets/clubs/villarreal-cf.png'),
    date: '14 Jun 2024',
    score: '1 x 2',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Real Sociedad',
    awayLogo: require('@/assets/clubs/real-sociedad.png'),
    date: '10 Jun 2024',
    score: '2 x 3',
  },
]

export default function ClubLastResults() {
  const { width } = useWindowDimensions()
  const isSmall = width < 700
  const [expanded, setExpanded] = useState(false)
  const visibleResults = expanded ? results : results.slice(0, 3)

  return (
    <View className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8 p-6">
      <Text className="text-yl-400 text-xl font-manropeBold mb-4">
        ÚLTIMOS RESULTADOS
      </Text>
      <View style={{ gap: 12 }}>
        {visibleResults.map(r => (
          <View
            key={r.home + r.away + r.date}
            className="bg-zinc-800"
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#333',
              borderRadius: 16,
              padding: 12,
              gap: 8,
              minWidth: 380,
              maxWidth: 800,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <View className="items-center justify-center">
              <Text
                style={{
                  color: '#aaa',
                  fontSize: 13,
                  minWidth: 90,
                  textAlign: 'center',
                }}
              >
                {r.date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: isSmall ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  flexDirection: isSmall ? 'column' : 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  {r.home}
                </Text>
                <Image source={r.homeLogo} style={{ width: 32, height: 32 }} />
              </View>

              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}
              >
                {r.score}
              </Text>

              <View
                style={{
                  flexDirection: isSmall ? 'column' : 'row',
                  flex: 1,
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Image source={r.awayLogo} style={{ width: 32, height: 32 }} />
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  {r.away}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FFD600',
          borderRadius: 24,
          marginTop: 24,
          alignSelf: 'center',
          paddingHorizontal: 32,
          paddingVertical: 12,
        }}
        onPress={() => setExpanded(e => !e)}
      >
        <Text
          style={{
            color: '#18181b',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          {expanded ? 'Ver menos' : 'Ver mais'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
