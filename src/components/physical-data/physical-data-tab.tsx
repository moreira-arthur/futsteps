import React from 'react'
import { Text, View } from 'react-native'
import { calculateIMC } from '../../lib/utils/imc'
import type { PhysicalCondition } from '../../types/physical-data'
import CustomPicker from '../common/custom-picker'
import FormInput from '../common/form-input'

const PHYSICAL_CONDITIONS: PhysicalCondition[] = [
  'Muito Fraco',
  'Fraco',
  'Regular',
  'Forte',
  'Muito Forte',
]

const PHYSICAL_CONDITIONS_OPTIONS = PHYSICAL_CONDITIONS.map(c => ({
  label: c,
  value: c,
}))

interface PhysicalDataTabProps {
  physicalCondition: PhysicalCondition
  onPhysicalConditionChange: (value: PhysicalCondition) => void
  weight: string
  onWeightChange: (value: string) => void
  height: string
  onHeightChange: (value: string) => void
  bodyFatPercentage: string
  onBodyFatPercentageChange: (value: string) => void
  leanMassPercentage: string
  onLeanMassPercentageChange: (value: string) => void
}

export default function PhysicalDataTab({
  physicalCondition,
  onPhysicalConditionChange,
  weight,
  onWeightChange,
  height,
  onHeightChange,
  bodyFatPercentage,
  onBodyFatPercentageChange,
  leanMassPercentage,
  onLeanMassPercentageChange,
}: PhysicalDataTabProps) {
  const imc =
    weight && height ? calculateIMC(Number(weight), Number(height)) : null

  return (
    <View className="bg-zinc-800 rounded-lg p-4">
      <CustomPicker
        label="Condição Física"
        value={physicalCondition}
        onValueChange={onPhysicalConditionChange}
        options={PHYSICAL_CONDITIONS_OPTIONS}
        placeholder="Selecione a condição física"
      />

      <FormInput
        label="Peso (kg)"
        placeholder="Peso"
        value={weight}
        onChangeText={onWeightChange}
        type="decimal"
        validationRules={[
          {
            validate: value =>
              !value || (Number(value) > 0 && Number(value) <= 300),
            message: 'Peso inválido',
          },
        ]}
      />

      <FormInput
        label="Altura (m)"
        placeholder="Altura em metros (ex: 1.75)"
        value={height}
        onChangeText={onHeightChange}
        type="decimal"
        validationRules={[
          {
            validate: value =>
              !value || (Number(value) > 0 && Number(value) <= 3),
            message: 'Altura inválida',
          },
        ]}
      />

      <View className="mb-4">
        <Text className="text-zinc-100 text-sm mb-2">IMC</Text>
        <View className="bg-zinc-900 p-4 rounded-lg">
          <Text className="text-zinc-100 text-lg">
            {imc ? imc.toFixed(2) : '---'}
          </Text>
        </View>
      </View>

      <FormInput
        label="Percentual de Gordura (%)"
        placeholder="Percentual de gordura"
        value={bodyFatPercentage}
        onChangeText={onBodyFatPercentageChange}
        type="decimal"
        validationRules={[
          {
            validate: value =>
              !value || (Number(value) >= 0 && Number(value) <= 100),
            message: 'Percentual inválido',
          },
        ]}
      />

      <FormInput
        label="Percentual de Massa Magra (%)"
        placeholder="Percentual de massa magra"
        value={leanMassPercentage}
        onChangeText={onLeanMassPercentageChange}
        type="decimal"
        validationRules={[
          {
            validate: value =>
              !value || (Number(value) >= 0 && Number(value) <= 100),
            message: 'Percentual inválido',
          },
        ]}
      />
    </View>
  )
}
