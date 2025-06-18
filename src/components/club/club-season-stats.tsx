import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const stats = [
  { label: 'Gols marcados', value: 54, max: 100, color: '#39FF14' },
  { label: 'Gols sofridos', value: 32, max: 100, color: '#FF4747' },
  {
    label: 'Média de posse de bola (%)',
    value: 62,
    max: 100,
    color: '#FFD600',
  },
  { label: 'Precisão de passes (%)', value: 88, max: 100, color: '#00BFFF' },
  { label: 'Chutes a gol', value: 350, max: 500, color: '#00FF00' },
  { label: 'Chutes no alvo', value: 210, max: 500, color: '#00FF00' },
  { label: 'Faltas cometidas', value: 40, max: 100, color: '#FF8C00' },
  { label: 'Cartões amarelos', value: 12, max: 20, color: '#FFD600' },
  { label: 'Cartões vermelhos', value: 2, max: 10, color: '#FF4747' },
  { label: 'Jogos sem sofrer gol', value: 8, max: 38, color: '#39FF14' },
]

function ProgressBar({
  value,
  max = 100,
  color = '#39FF14',
}: { value: number; max?: number; color?: string }) {
  return (
    <View
      style={{
        height: 6,
        backgroundColor: '#444',
        borderRadius: 4,
        width: '100%',
        marginTop: 4,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          height: 6,
          width: `${Math.max(0, Math.min(1, value / max)) * 100}%`,
          backgroundColor: color,
          borderRadius: 4,
        }}
      />
    </View>
  )
}

export default function ClubSeasonStats() {
  const [expanded, setExpanded] = useState(false)
  const visibleStats = expanded ? stats : stats.slice(0, 4)

  return (
    <View className="bg-zinc-800 rounded-2xl w-full max-w-6xl mb-8 p-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-yl-400 text-xl font-manropeBold flex-1">
          ESTATÍSTICAS DA TEMPORADA
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
      <View style={{ gap: 12 }}>
        {visibleStats.map(s => (
          <View key={s.label} style={{ marginBottom: 2 }}>
            <View className="flex-row items-center justify-between mb-1">
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                {s.label}
              </Text>
              <Text
                style={{ color: s.color, fontWeight: 'bold', fontSize: 15 }}
              >
                {s.value}
              </Text>
            </View>
            <ProgressBar value={s.value} max={s.max} color={s.color} />
          </View>
        ))}
      </View>
    </View>
  )
}
