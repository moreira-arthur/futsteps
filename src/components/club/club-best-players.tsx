import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const bestPlayers = [
  { name: 'Frenkie De Jong', goals: 9 },
  { name: 'Aleksandar Mitrovic', goals: 6 },
  { name: 'Harry Kane', goals: 4 },
  { name: 'Rodrigo', goals: 4 },
  { name: 'Robert Lewandowski', goals: 3 },
  { name: 'Memphis Depay', goals: 3 },
  { name: 'Gerard Piqué', goals: 2 },
  { name: 'Pedri', goals: 2 },
  { name: 'Ansu Fati', goals: 2 },
  { name: 'Gavi', goals: 1 },
]

export default function ClubBestPlayers() {
  const [expanded, setExpanded] = useState(false)
  const visiblePlayers = expanded ? bestPlayers : bestPlayers.slice(0, 3)

  return (
    <View className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8 p-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-yl-400 text-xl font-manropeBold flex-1">
          MELHORES JOGADORES
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: 12,
            backgroundColor: '#FFD600',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 6,
          }}
          onPress={() => setExpanded(e => !e)}
        >
          <Text style={{ color: '#18181b', fontWeight: 'bold', fontSize: 15 }}>
            {expanded ? 'Ver menos' : 'Ver mais'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between mb-2">
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
          Nome do Jogador
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
          Gols
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        {visiblePlayers.map(p => (
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
