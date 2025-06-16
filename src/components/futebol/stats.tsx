import React from 'react'
import { Text, View } from 'react-native'

type Stat = {
  label: string
  value: number
  color: string
}

type StatsProps = {
  stats: Stat[]
}

export function Stats({ stats }: StatsProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#23232b',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 12,
        }}
      >
        Estatísticas
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {stats.map(stat => (
          <View
            key={stat.label}
            style={{
              width: '48%',
              backgroundColor: '#18181b',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: '#ccc', fontSize: 13, marginBottom: 4 }}>
              {stat.label}
            </Text>
            <Text
              style={{ color: stat.color, fontWeight: 'bold', fontSize: 20 }}
            >
              {stat.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
