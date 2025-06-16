import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const results = [
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Crystal Palace',
    awayLogo: require('@/assets/clubs/crystal-palace.png'),
    date: '29 Aug 2022',
    score: '4 x 1',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Manchester City',
    awayLogo: require('@/assets/clubs/manchester-city.png'),
    date: '29 Aug 2022',
    score: '4 x 2',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Leeds United',
    awayLogo: require('@/assets/clubs/leeds-united-f.c..png'),
    date: '27 Aug 2022',
    score: '3 x 1',
  },
  {
    home: 'Barcelona',
    homeLogo: require('@/assets/clubs/barcelona.png'),
    away: 'Chelsea',
    awayLogo: require('@/assets/clubs/chelsea.png'),
    date: '27 Aug 2022',
    score: '2 x 1',
  },
]

export default function ClubLastResults() {
  return (
    <View className="bg-zinc-900 rounded-2xl w-full max-w-6xl mb-8 p-6">
      <Text className="text-yl-400 text-lg font-manropeBold mb-4">
        ÚLTIMOS RESULTADOS
      </Text>
      <View style={{ gap: 12 }}>
        {results.map(r => (
          <View
            key={r.home + r.away + r.date}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#333',
              borderRadius: 16,
              padding: 12,
              gap: 8,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                minWidth: 80,
              }}
            >
              {r.home}
            </Text>
            <Image
              source={r.homeLogo}
              style={{ width: 32, height: 32, marginHorizontal: 4 }}
            />
            <Text style={{ color: '#aaa', fontSize: 13, minWidth: 90 }}>
              {r.date}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                minWidth: 40,
                textAlign: 'center',
              }}
            >
              {r.score}
            </Text>
            <Image
              source={r.awayLogo}
              style={{ width: 32, height: 32, marginHorizontal: 4 }}
            />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                minWidth: 80,
              }}
            >
              {r.away}
            </Text>
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
      >
        <Text
          style={{
            color: '#18181b',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Ver mais
        </Text>
      </TouchableOpacity>
    </View>
  )
}
