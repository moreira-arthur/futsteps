import type { Stat } from '@/mocks/mock-stats'
import React from 'react'
import { ScrollView, Text, View, useWindowDimensions } from 'react-native'

type StatsProps = {
  stats: Stat[]
}

function ProgressBar({
  value,
  max = 100,
  color = '#39FF14',
}: {
  value: number
  max?: number
  color?: string
}) {
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

export function Stats({ stats }: StatsProps) {
  const { width } = useWindowDimensions()
  const isSmall = width < 500

  return (
    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
      <Text className="text-zinc-100 text-base font-manropeBold mb-3">
        Estatísticas
      </Text>
      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap gap-2">
          {stats.map(stat => (
            <View
              key={stat.label}
              className={`${isSmall ? 'w-full' : 'w-[48%]'} bg-zinc-900 rounded-lg p-3`}
            >
              <Text className="text-zinc-100 font-manropeBold text-sm mb-1">
                {stat.label}
              </Text>
              <Text className="text-zinc-100 text-sm mb-1">{stat.value}</Text>
              <ProgressBar
                value={stat.value}
                max={stat.max}
                color={stat.color}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
