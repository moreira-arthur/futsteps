import React from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'

// Mock de dados do clube
const club = {
  name: 'Futbol Club Barcelona',
  league: 'La Liga',
  leagueLogo: require('@/assets/clubs/la-liga.png'), // Substitua pelo caminho correto se necessário
  position: 1,
  points: 33,
  games: 12,
  avgPoints: 2.75,
  wins: 11,
  losses: 1,
  draws: 0,
  logo: require('@/assets/clubs/barcelona.png'),
}

export default function ClubInfoCard() {
  const { width } = useWindowDimensions()
  const isSmall = width < 900

  return (
    <View
      className="bg-zinc-900 rounded-2xl w-full max-w-6xl mb-8 p-6"
      style={{ position: 'relative' }}
    >
      <View style={{ flex: 1, zIndex: 2 }}>
        <View
          style={{
            flexDirection: isSmall ? 'column' : 'column',
            alignItems: isSmall ? 'flex-start' : 'flex-start',
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 26,
              fontFamily: 'Manrope-Bold',
              flex: 1,
            }}
          >
            {club.name}
          </Text>
          {isSmall ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Image
                source={club.leagueLogo}
                style={{ width: 90, height: 32, marginRight: 40 }}
                resizeMode="contain"
              />
              <Text className="text-yl-400 text-2xl font-manropeBold">
                #{String(club.position)}
              </Text>
            </View>
          ) : (
            <>
              <View className="flex-row items-center justify-center">
                <Image
                  source={club.leagueLogo}
                  style={{ width: 90, height: 32, marginRight: 40 }}
                  resizeMode="contain"
                />
                <Text className="text-yl-400 text-2xl font-manropeBold ml-4">
                  #{String(club.position)}
                </Text>
              </View>
            </>
          )}
        </View>
        <View style={{ flexDirection: 'row', gap: 32 }}>
          {/* Coluna esquerda */}
          <View style={{ gap: 6 }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              Pontos conquistados na temporada:{' '}
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                {club.points}
              </Text>
            </Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              Total de jogos disputados:{' '}
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                {club.games}
              </Text>
            </Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              Média de pontos por jogo:{' '}
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                {club.avgPoints}
              </Text>
            </Text>
          </View>
          {/* Coluna direita */}
          <View style={{ gap: 6, marginLeft: 32 }}>
            <Text
              style={{ color: '#39FF14', fontWeight: 'bold', fontSize: 16 }}
            >
              Vitórias:{' '}
              <Text
                style={{ color: '#39FF14', fontWeight: 'bold', fontSize: 18 }}
              >
                {club.wins}
              </Text>
            </Text>
            <Text
              style={{ color: '#FF4747', fontWeight: 'bold', fontSize: 16 }}
            >
              Derrotas:{' '}
              <Text
                style={{ color: '#FF4747', fontWeight: 'bold', fontSize: 18 }}
              >
                {club.losses}
              </Text>
            </Text>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Empates:{' '}
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                {club.draws}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {/* Logo do clube */}
      <View
        style={{
          position: isSmall ? 'relative' : 'absolute',
          right: isSmall ? 0 : -60,
          top: isSmall ? 16 : 10,
          bottom: isSmall ? 0 : 0,
          justifyContent: 'center',
          zIndex: 1,
          alignItems: isSmall ? 'center' : 'flex-end',
        }}
      >
        <Image
          source={club.logo}
          style={{ width: 200, height: 200, resizeMode: 'contain', opacity: 1 }}
        />
      </View>
    </View>
  )
}
