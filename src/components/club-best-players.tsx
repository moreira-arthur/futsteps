import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const bestPlayers = [
  { name: 'Frenkie De Jong', goals: 9 },
  { name: 'Aleksandar Mitrovic', goals: 6 },
  { name: 'Harry Kane', goals: 4 },
  { name: 'Rodrigo', goals: 4 },
]

export default function ClubBestPlayers() {
  return (
    <View className="bg-zinc-900 rounded-2xl w-full max-w-6xl mb-8 p-6">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <Text className="text-yl-400 text-lg font-manropeBold">
          Melhores Jogadores
        </Text>
        <TouchableOpacity>
          <Text style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: 15 }}>
            Ver mais
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
          Nome do Jogador
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
          Gols
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        {bestPlayers.map(p => (
          <View
            key={p.name}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#333',
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>{p.name}</Text>
            <Text
              style={{ color: '#FFD600', fontWeight: 'bold', fontSize: 15 }}
            >
              {p.goals}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
