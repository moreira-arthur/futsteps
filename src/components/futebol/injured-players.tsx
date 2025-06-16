import { Player } from '@/types/mocks'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

type InjuredPlayer = Player & {
  injury: string
  returnDate: string
}

type InjuredPlayersProps = {
  players: InjuredPlayer[]
}

export function InjuredPlayers({ players }: InjuredPlayersProps) {
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
        Jogadores Lesionados
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {players.map(player => (
          <View
            key={player.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#ef4444',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {player.number}
                </Text>
              </View>
              <View>
                <Text style={{ color: '#fff', fontWeight: '500' }}>
                  {player.name}
                </Text>
                <Text style={{ color: '#ef4444', fontSize: 12 }}>
                  {player.injury}
                </Text>
              </View>
            </View>
            <Text style={{ color: '#ccc', fontSize: 12 }}>
              Retorno: {player.returnDate}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
