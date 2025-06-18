import type { Player } from '@/mocks/mock-training'
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
    <View className="flex-1 bg-zinc-800 rounded-lg p-3">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-zinc-100 text-base font-manropeBold">
          {teamType === 'titular' ? 'Titulares' : 'Reservas'}
        </Text>
        <Text className="text-zinc-400 text-sm">{formation}</Text>
      </View>
      <ScrollView className="flex-1">
        {filteredPlayers.map(player => (
          <View
            key={player.id}
            className="flex-row items-center justify-between py-2 border-b border-zinc-700"
          >
            <View className="flex-row items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                  teamType === 'titular' ? 'bg-red-500' : 'bg-yl-400'
                }`}
              >
                <Text
                  className={`font-manropeBold ${
                    teamType === 'titular' ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  {player.number}
                </Text>
              </View>
              <View>
                <Text className="text-zinc-100 font-manropeMedium">
                  {player.name}
                </Text>
                <Text className="text-zinc-400 text-sm">{player.position}</Text>
              </View>
            </View>
            <Text className="text-zinc-400 text-sm">{player.age} anos</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
