import type { Player } from '@/mocks/mock-training'
import React from 'react'
import { ScrollView, Text, View, useWindowDimensions } from 'react-native'

type InjuredPlayer = Player & {
  injury: string
  returnDate: string
}

type InjuredPlayersProps = {
  players: InjuredPlayer[]
}

export function InjuredPlayers({ players }: InjuredPlayersProps) {
  if (!players.length) return null

  return (
    <View
      className="w-full bg-zinc-800 rounded-lg p-3 md:ml-0 md:mr-0 md:w-full"
      style={{ alignSelf: 'center' }}
    >
      <Text className="text-zinc-100 text-base font-manropeBold mb-3">
        Lesionados
      </Text>
      <View className="flex-row border-b border-zinc-700 pb-2 mb-2">
        <Text className="flex-1 text-zinc-400 font-manropeMedium text-sm">
          Nome
        </Text>
        <Text className="flex-1 text-zinc-400 font-manropeMedium text-sm">
          Lesão
        </Text>
        <Text className="w-28 text-zinc-400 font-manropeMedium text-sm text-right">
          Retorno
        </Text>
      </View>
      {players.map((player, idx) => (
        <View
          key={player.id}
          className="flex-row items-center border-b border-zinc-700 py-2"
        >
          <Text className="flex-1 text-zinc-100 text-sm">{player.name}</Text>
          <Text className="flex-1 text-red-500 text-sm">{player.injury}</Text>
          <Text className="w-28 text-zinc-400 text-sm text-right">
            {player.returnDate}
          </Text>
        </View>
      ))}
    </View>
  )
}
