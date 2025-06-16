import { Player } from '@/types/mocks'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

type PlayerTableProps = {
  players: Player[]
}

export function PlayerTable({ players }: PlayerTableProps) {
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
        Jogadores
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#333',
          }}
        >
          <Text
            style={{ flex: 1, color: '#ccc', fontWeight: '500', fontSize: 13 }}
          >
            Número
          </Text>
          <Text
            style={{ flex: 2, color: '#ccc', fontWeight: '500', fontSize: 13 }}
          >
            Nome
          </Text>
          <Text
            style={{ flex: 1, color: '#ccc', fontWeight: '500', fontSize: 13 }}
          >
            Idade
          </Text>
          <Text
            style={{ flex: 1, color: '#ccc', fontWeight: '500', fontSize: 13 }}
          >
            Posição
          </Text>
        </View>
        {players.map(player => (
          <View
            key={player.id}
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          >
            <Text style={{ flex: 1, color: '#fff', fontSize: 13 }}>
              {player.number}
            </Text>
            <Text style={{ flex: 2, color: '#fff', fontSize: 13 }}>
              {player.name}
            </Text>
            <Text style={{ flex: 1, color: '#ccc', fontSize: 13 }}>
              {player.age}
            </Text>
            <Text style={{ flex: 1, color: '#ccc', fontSize: 13 }}>
              {player.position}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
