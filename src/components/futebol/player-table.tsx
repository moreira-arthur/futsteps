import type { Player } from '@/mocks/mock-training'
import React, { useState } from 'react'
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'

type PlayerTableProps = {
  players: Player[]
}

export function PlayerTable({ players }: PlayerTableProps) {
  const { width } = useWindowDimensions()
  const isSmall = width < 700
  const [expanded, setExpanded] = useState(false)

  const visiblePlayers = isSmall && !expanded ? players.slice(0, 5) : players
  const hiddenCount = players.length - 5

  return (
    <View className="bg-zinc-800 rounded-lg p-3">
      <Text className="text-zinc-100 text-base font-manropeBold mb-3">
        Jogadores
      </Text>
      {isSmall ? (
        // MOBILE: cartões verticais
        <View style={{ gap: 12 }}>
          {visiblePlayers.map(player => (
            <View
              key={player.id}
              style={{
                backgroundColor: '#18181b',
                borderRadius: 12,
                padding: 16,
                gap: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View className="w-8 h-8 rounded-full bg-zinc-700 items-center justify-center">
                  <Text className="text-zinc-100 font-manropeBold">
                    {player.number}
                  </Text>
                </View>
                <View>
                  <Text className="text-zinc-100 font-manropeMedium">
                    {player.name}
                  </Text>
                  <Text className="text-zinc-400 text-sm">
                    {player.position}
                  </Text>
                </View>
              </View>
              <Text className="text-zinc-400 text-sm">
                Idade: {player.age} anos
              </Text>
            </View>
          ))}
          {players.length > 5 && (
            <Pressable onPress={() => setExpanded(e => !e)}>
              <Text className="text-yl-400 text-sm text-center font-manropeBold py-2">
                {expanded ? 'Mostrar menos' : `+${hiddenCount} jogadores`}
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        // DESKTOP: tabela tradicional
        <ScrollView className="flex-1">
          <View className="flex-row py-2 border-b border-zinc-700">
            <Text className="w-16 text-zinc-400 font-manropeMedium text-sm">
              Número
            </Text>
            <Text className="flex-1 text-zinc-400 font-manropeMedium text-sm">
              Nome
            </Text>
            <Text className="w-16 text-zinc-400 font-manropeMedium text-sm">
              Idade
            </Text>
            <Text className="w-24 text-zinc-400 font-manropeMedium text-sm">
              Posição
            </Text>
          </View>
          {players.map(player => (
            <View
              key={player.id}
              className="flex-row py-2 border-b border-zinc-700"
            >
              <Text className="w-16 text-zinc-100 text-sm">
                {player.number}
              </Text>
              <Text className="flex-1 text-zinc-100 text-sm">
                {player.name}
              </Text>
              <Text className="w-16 text-zinc-400 text-sm">{player.age}</Text>
              <Text className="w-24 text-zinc-400 text-sm">
                {player.position}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}
