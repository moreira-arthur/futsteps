import React from 'react'
import { Text, View } from 'react-native'
import CustomSlider from '../common/slider'

interface PhysicalFitnessTabProps {
  // Capacidades de Movimento e Deslocamento
  agility: number
  onAgilityChange: (value: number) => void
  speed: number
  onSpeedChange: (value: number) => void
  aerobicEndurance: number
  onAerobicEnduranceChange: (value: number) => void

  // Capacidades de Força e Potência
  muscularStrength: number
  onMuscularStrengthChange: (value: number) => void
  muscularPower: number
  onMuscularPowerChange: (value: number) => void
  anaerobicEndurance: number
  onAnaerobicEnduranceChange: (value: number) => void

  // Capacidades de Flexibilidade e Equilíbrio
  flexibility: number
  onFlexibilityChange: (value: number) => void
  balance: number
  onBalanceChange: (value: number) => void

  // Capacidades de Coordenação e Reação
  coordination: number
  onCoordinationChange: (value: number) => void
  reaction: number
  onReactionChange: (value: number) => void
}

export default function PhysicalFitnessTab({
  agility,
  onAgilityChange,
  speed,
  onSpeedChange,
  aerobicEndurance,
  onAerobicEnduranceChange,
  muscularStrength,
  onMuscularStrengthChange,
  muscularPower,
  onMuscularPowerChange,
  anaerobicEndurance,
  onAnaerobicEnduranceChange,
  flexibility,
  onFlexibilityChange,
  balance,
  onBalanceChange,
  coordination,
  onCoordinationChange,
  reaction,
  onReactionChange,
}: PhysicalFitnessTabProps) {
  return (
    <View className="bg-zinc-800 rounded-lg p-4">
      {/* Seção 1: Capacidades de Movimento e Deslocamento */}
      <View className="mb-6">
        <Text className="text-zinc-100 text-lg font-manropeBold mb-4">
          Capacidades de Movimento e Deslocamento
        </Text>
        <CustomSlider
          label="Agilidade"
          value={agility}
          onValueChange={onAgilityChange}
        />
        <CustomSlider
          label="Teste de Velocidade"
          value={speed}
          onValueChange={onSpeedChange}
        />
        <CustomSlider
          label="Resistência Aeróbica"
          value={aerobicEndurance}
          onValueChange={onAerobicEnduranceChange}
        />
      </View>

      {/* Seção 2: Capacidades de Força e Potência */}
      <View className="mb-6">
        <Text className="text-zinc-100 text-lg font-manropeBold mb-4">
          Capacidades de Força e Potência
        </Text>
        <CustomSlider
          label="Força Muscular"
          value={muscularStrength}
          onValueChange={onMuscularStrengthChange}
        />
        <CustomSlider
          label="Potência Muscular"
          value={muscularPower}
          onValueChange={onMuscularPowerChange}
        />
        <CustomSlider
          label="Resistência Anaeróbica"
          value={anaerobicEndurance}
          onValueChange={onAnaerobicEnduranceChange}
        />
      </View>

      {/* Seção 3: Capacidades de Flexibilidade e Equilíbrio */}
      <View className="mb-6">
        <Text className="text-zinc-100 text-lg font-manropeBold mb-4">
          Capacidades de Flexibilidade e Equilíbrio
        </Text>
        <CustomSlider
          label="Flexibilidade"
          value={flexibility}
          onValueChange={onFlexibilityChange}
        />
        <CustomSlider
          label="Equilíbrio"
          value={balance}
          onValueChange={onBalanceChange}
        />
      </View>

      {/* Seção 4: Capacidades de Coordenação e Reação */}
      <View className="mb-6">
        <Text className="text-zinc-100 text-lg font-manropeBold mb-4">
          Capacidades de Coordenação e Reação
        </Text>
        <CustomSlider
          label="Coordenação"
          value={coordination}
          onValueChange={onCoordinationChange}
        />
        <CustomSlider
          label="Reação"
          value={reaction}
          onValueChange={onReactionChange}
        />
      </View>
    </View>
  )
}
