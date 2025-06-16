import { Player } from '@/types/mocks'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

type LineupProps = {
  players: Player[]
  formation: string
  teamType: 'titular' | 'reserva'
}

export function Lineup({ players, formation, teamType }: LineupProps) {
  const filteredPlayers = players.filter(player => player.teamType === teamType)

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          {teamType === 'titular' ? 'Titulares' : 'Reservas'}
        </Text>
        <Text style={{ color: '#ccc', fontSize: 14 }}>{formation}</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {filteredPlayers.map(player => (
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
                  backgroundColor:
                    teamType === 'titular' ? '#ef4444' : '#3b82f6',
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
                <Text style={{ color: '#ccc', fontSize: 12 }}>
                  {player.position}
                </Text>
              </View>
            </View>
            <Text style={{ color: '#ccc', fontSize: 12 }}>
              {player.age} anos
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
