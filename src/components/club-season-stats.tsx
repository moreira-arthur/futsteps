import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const stats = [
  { label: 'Gols marcados:', value: '54' },
  { label: 'Gols sofridos:', value: '32' },
  { label: 'Média de posse de bola:', value: '62%' },
  { label: 'Precisão de passes:', value: '88%' },
  { label: 'Chutes a gol:', value: '350' },
  { label: 'Chutes no alvo:', value: '210' },
]

export default function ClubSeasonStats() {
  return (
    <View className="bg-zinc-900 rounded-2xl w-full max-w-md mb-8 p-6">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <Text className="text-yl-400 text-lg font-manropeBold">
          Estáticas da Temporada
        </Text>
        <TouchableOpacity>
          <Text style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: 15 }}>
            Ver mais
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 6 }}>
        {stats.map(s => (
          <View
            key={s.label}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>{s.label}</Text>
            <Text
              style={{ color: '#FFD600', fontWeight: 'bold', fontSize: 15 }}
            >
              {s.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
