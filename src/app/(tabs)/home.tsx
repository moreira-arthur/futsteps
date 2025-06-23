import { mockInjuries } from '@/mocks/mock-injuries'
import { mockStats } from '@/mocks/mock-stats'
import { mockTraining } from '@/mocks/mock-training'
import type { Player } from '@/mocks/mock-training'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import ScreenContainer from '../../components/common/screen-container'
import { Field } from '../../components/futebol/field'
import { InjuredPlayers } from '../../components/futebol/injured-players'
import { Lineup } from '../../components/futebol/lineup'
import { PlayerTable } from '../../components/futebol/player-table'
import { Stats } from '../../components/futebol/stats'

export default function HomeScreen() {
  const { width } = useWindowDimensions()
  const isSmall = width < 900
  const router = useRouter()

  // Cálculo do FIELD_WIDTH igual ao Field
  const FIELD_MARGIN = 16
  const MAX_FIELD_WIDTH = 1000
  const MIN_FIELD_WIDTH = 320
  const FIELD_WIDTH = Math.max(
    MIN_FIELD_WIDTH,
    Math.min(width - FIELD_MARGIN * 2, MAX_FIELD_WIDTH)
  )

  function handlePlayerSeeMore(player: Player) {
    router.push(`/statistics?player=${encodeURIComponent(player.name)}`)
  }

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text className="flex mt-5 items-center justify-center text-yl-400 text-3xl font-manropeBold">
          ÚLTIMO TREINO
        </Text>
        {/* Descrição do jogo */}
        <View
          style={{ width: FIELD_WIDTH }}
          className="flex-row items-center justify-between mx-auto mt-10"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-red-500" />
            <View>
              <Text className="text-zinc-100 font-manropeBold text-lg">
                Titulares
              </Text>
              <Text className="text-zinc-400 text-base">
                {mockTraining.formationTitular}
              </Text>
            </View>
          </View>
          <Text className="text-zinc-400 text-base font-manropeBold">FT</Text>
          <View className="flex-row items-center gap-3">
            <View className="items-end">
              <Text className="text-zinc-100 font-manropeBold text-lg">
                Reservas
              </Text>
              <Text className="text-zinc-400 text-base">
                {mockTraining.formationReserve}
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-yl-400" />
          </View>
        </View>
        {/* Campo centralizado */}
        <View className="items-center justify-center mt-10 mb-8">
          <Field
            players={mockTraining.players}
            formationTitular={mockTraining.formationTitular}
            formationReserve={mockTraining.formationReserve}
            onPlayerSeeMore={handlePlayerSeeMore}
          />
        </View>
        {/* Grid responsivo para os cards */}
        {isSmall ? (
          // MOBILE: Layout em coluna
          <View className="flex-col gap-4 mb-4">
            <View className="w-full bg-zinc-800 rounded-lg p-3">
              <Lineup
                players={mockTraining.players}
                formation={mockTraining.formationTitular}
                teamType="titular"
              />
            </View>
            <View className="w-full bg-zinc-800 rounded-lg p-3">
              <Lineup
                players={mockTraining.players}
                formation={mockTraining.formationReserve}
                teamType="reserva"
              />
            </View>
            <View className="w-full bg-zinc-800 rounded-lg p-3">
              <PlayerTable players={mockTraining.players} />
            </View>
            <View className="w-full bg-zinc-800 rounded-lg p-3">
              <Stats stats={mockStats} />
            </View>
            <View className="w-full bg-zinc-800 rounded-lg p-3">
              <InjuredPlayers players={mockInjuries} />
            </View>
          </View>
        ) : (
          // DESKTOP: Layout em grid
          <View className="flex-row flex-wrap gap-4 mb-4 justify-center">
            <View className="w-[48%] bg-zinc-800 rounded-lg p-3">
              <Lineup
                players={mockTraining.players}
                formation={mockTraining.formationTitular}
                teamType="titular"
              />
            </View>
            <View className="w-[48%] bg-zinc-800 rounded-lg p-3">
              <Lineup
                players={mockTraining.players}
                formation={mockTraining.formationReserve}
                teamType="reserva"
              />
            </View>
            <View className="w-[48%] bg-zinc-800 rounded-lg p-3">
              <PlayerTable players={mockTraining.players} />
            </View>
            <View className="w-[48%] bg-zinc-800 rounded-lg p-3">
              <Stats stats={mockStats} />
            </View>
            <View className="w-[97%] bg-zinc-800 rounded-lg p-3">
              <InjuredPlayers players={mockInjuries} />
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  )
}
