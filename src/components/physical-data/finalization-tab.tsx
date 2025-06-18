import React from 'react'
import { Pressable, Text, View } from 'react-native'
import FormInput from '../common/form-input'

interface FinalizationTabProps {
  observation: string
  onObservationChange: (value: string) => void
  onFinish: () => void
  onCancel: () => void
  onBack: () => void
}

export default function FinalizationTab({
  observation,
  onObservationChange,
  onFinish,
  onCancel,
  onBack,
}: FinalizationTabProps) {
  return (
    <View className="bg-zinc-800 rounded-lg p-4">
      <FormInput
        label="Observação"
        placeholder="Digite suas observações"
        value={observation}
        onChangeText={onObservationChange}
        multiline
        numberOfLines={4}
      />

      <View className="flex-row justify-between mt-4">
        <Pressable
          className="bg-zinc-700 p-4 rounded-lg flex-1 mr-2"
          onPress={onCancel}
        >
          <Text className="text-zinc-100 text-center font-manropeBold">
            Cancelar
          </Text>
        </Pressable>
        <Pressable
          className="bg-yl-400 p-4 rounded-lg flex-1 ml-2"
          onPress={onFinish}
        >
          <Text className="text-zinc-900 text-center font-manropeBold">
            Finalizar
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
