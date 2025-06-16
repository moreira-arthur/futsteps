import { Field } from '@/components/futebol/field'
import { InjuredPlayers } from '@/components/futebol/injured-players'
import { Lineup } from '@/components/futebol/lineup'
import { PlayerTable } from '@/components/futebol/player-table'
import { Stats } from '@/components/futebol/stats'
import { mockInjuredPlayers, mockStats, mockTraining } from '@/types/mocks'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#18181b' }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text className="flex mt-5 items-center justify-center text-yellow-400 text-3xl font-manropeBold ">
        Último treino
      </Text>
      {/* Campo centralizado */}
      <View className="flex-1 items-center mt-10 mb-8">
        <Field
          players={mockTraining.players}
          formationTitular={mockTraining.formationTitular}
          formationReserve={mockTraining.formationReserve}
        />
      </View>
      {/* Cards em grid responsivo */}
      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#23232b',
            borderRadius: 16,
            padding: 12,
          }}
        >
          <Lineup
            players={mockTraining.players}
            formation={mockTraining.formationTitular}
            teamType="titular"
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#23232b',
            borderRadius: 16,
            padding: 12,
          }}
        >
          <Lineup
            players={mockTraining.players}
            formation={mockTraining.formationReserve}
            teamType="reserva"
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#23232b',
            borderRadius: 16,
            padding: 12,
          }}
        >
          <PlayerTable players={mockTraining.players} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#23232b',
            borderRadius: 16,
            padding: 12,
          }}
        >
          <Stats stats={mockStats} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#23232b',
          borderRadius: 16,
          padding: 12,
          marginBottom: 16,
        }}
      >
        <InjuredPlayers players={mockInjuredPlayers} />
      </View>
    </ScrollView>
  )
}
