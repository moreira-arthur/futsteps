import { mockAthleteTrainingStats as stats } from '@/mocks/mock-athlete-training-stats'
import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'

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

export default function AthleteLastTrainingStatsCard() {
  const { width } = useWindowDimensions()
  const isSmall = width < 900
  return (
    <View
      className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8"
      style={{ padding: isSmall ? 16 : 32 }}
    >
      <Text className="text-yl-400 text-xl font-manropeBold mb-4">
        ESTATÍSTICAS DO ÚLTIMO TREINO
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 24,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Coluna treino */}
        <View style={{ minWidth: 140, flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            TREINO
          </Text>
          {stats.map(stat => (
            <View key={stat.label} style={{ marginBottom: 8 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                {stat.label}
              </Text>
              <Text style={{ color: '#fff', fontSize: 15 }}>{stat.treino}</Text>
              <ProgressBar value={stat.treino} max={stat.max} />
            </View>
          ))}
        </View>
        {/* Coluna jogo */}
        <View style={{ minWidth: 140, flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            JOGO
          </Text>
          {stats.map(stat => (
            <View key={stat.label} style={{ marginBottom: 8 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
                {stat.label}
              </Text>
              <Text style={{ color: '#fff', fontSize: 15 }}>{stat.jogo}</Text>
              <ProgressBar value={stat.jogo} max={stat.max} />
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
