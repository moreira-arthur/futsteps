import React, { useState } from 'react'
import { FlatList, Modal, Pressable, Text, TextInput, View } from 'react-native'
import type { HydrationLevel } from '../../types/physical-data'
import CustomPicker from '../common/custom-picker'
import FormInput from '../common/form-input'
import CustomSlider from '../common/slider'

const HYDRATION_LEVELS: HydrationLevel[] = ['Ruim', 'Regular', 'Bom', 'Ótimo']
const HYDRATION_LEVELS_OPTIONS = HYDRATION_LEVELS.map(l => ({
  label: l,
  value: l,
}))

const ATTRIBUTE_TYPES = [
  { label: 'Número', value: 'number' },
  { label: 'Porcentagem', value: 'percent' },
  { label: 'Níveis', value: 'levels' },
]

interface BiometricDataTabProps {
  hydrationLevel: HydrationLevel
  onHydrationLevelChange: (value: HydrationLevel) => void
  maxHeartRate: string
  onMaxHeartRateChange: (value: string) => void
  restingHeartRate: string
  onRestingHeartRateChange: (value: string) => void
  oxygenSaturation: number
  onOxygenSaturationChange: (value: number) => void
  systolicBloodPressure: string
  onSystolicBloodPressureChange: (value: string) => void
  diastolicBloodPressure: string
  onDiastolicBloodPressureChange: (value: string) => void
  bloodLactate: string
  onBloodLactateChange: (value: string) => void
  onAddMoreBiometrics: () => void
}

type CustomAttributeType = 'number' | 'percent' | 'levels'

interface CustomAttribute {
  id: string
  name: string
  type: CustomAttributeType
  placeholder: string
  example: string
  levels?: string[]
  value: string | number
}

export default function BiometricDataTab({
  hydrationLevel,
  onHydrationLevelChange,
  maxHeartRate,
  onMaxHeartRateChange,
  restingHeartRate,
  onRestingHeartRateChange,
  oxygenSaturation,
  onOxygenSaturationChange,
  systolicBloodPressure,
  onSystolicBloodPressureChange,
  diastolicBloodPressure,
  onDiastolicBloodPressureChange,
  bloodLactate,
  onBloodLactateChange,
}: BiometricDataTabProps) {
  const [customAttributes, setCustomAttributes] = useState<CustomAttribute[]>(
    []
  )
  const [showModal, setShowModal] = useState(false)
  const [attrName, setAttrName] = useState('')
  const [attrType, setAttrType] = useState<CustomAttributeType>('number')
  const [attrPlaceholder, setAttrPlaceholder] = useState('')
  const [attrExample, setAttrExample] = useState('')
  const [attrLevels, setAttrLevels] = useState('')

  const handleAddCustomAttribute = () => {
    if (!attrName.trim()) return
    const newAttr: CustomAttribute = {
      id: Date.now().toString(),
      name: attrName,
      type: attrType,
      placeholder: attrPlaceholder,
      example: attrExample,
      levels:
        attrType === 'levels'
          ? attrLevels
              .split(',')
              .map(l => l.trim())
              .filter(Boolean)
          : undefined,
      value: attrType === 'percent' ? 0 : '',
    }
    setCustomAttributes(prev => [...prev, newAttr])
    setShowModal(false)
    setAttrName('')
    setAttrType('number')
    setAttrPlaceholder('')
    setAttrExample('')
    setAttrLevels('')
  }

  const handleCustomValueChange = (id: string, value: string | number) => {
    setCustomAttributes(prev =>
      prev.map(attr => (attr.id === id ? { ...attr, value } : attr))
    )
  }

  return (
    <View className="bg-zinc-800 rounded-lg p-4">
      <CustomPicker
        label="Nível de Hidratação"
        value={hydrationLevel}
        onValueChange={onHydrationLevelChange}
        options={HYDRATION_LEVELS_OPTIONS}
        placeholder="Selecione o nível de hidratação"
      />

      <FormInput
        label="Frequência Cardíaca Máxima (bpm)"
        placeholder="Frequência cardíaca máxima"
        value={maxHeartRate}
        onChangeText={onMaxHeartRateChange}
        type="number"
        keyboardType="numeric"
      />

      <FormInput
        label="Frequência Cardíaca de Repouso (bpm)"
        placeholder="Frequência cardíaca de repouso"
        value={restingHeartRate}
        onChangeText={onRestingHeartRateChange}
        type="number"
        keyboardType="numeric"
      />

      <CustomSlider
        label="Saturação de Oxigênio (%)"
        value={oxygenSaturation}
        onValueChange={onOxygenSaturationChange}
      />

      <FormInput
        label="Pressão Arterial Sistólica (mmHg)"
        placeholder="Pressão arterial sistólica"
        value={systolicBloodPressure}
        onChangeText={onSystolicBloodPressureChange}
        type="number"
        keyboardType="numeric"
      />

      <FormInput
        label="Pressão Arterial Diastólica (mmHg)"
        placeholder="Pressão arterial diastólica"
        value={diastolicBloodPressure}
        onChangeText={onDiastolicBloodPressureChange}
        type="number"
        keyboardType="numeric"
      />

      <FormInput
        label="Nível de Lactato no Sangue (mmol/L)"
        placeholder="Nível de lactato no sangue"
        value={bloodLactate}
        onChangeText={onBloodLactateChange}
        type="number"
        keyboardType="numeric"
      />

      {/* Campos customizados */}
      {customAttributes.map(attr => (
        <View key={attr.id} className="mb-4">
          {attr.type === 'number' && (
            <FormInput
              label={attr.name}
              placeholder={attr.placeholder}
              value={String(attr.value)}
              onChangeText={v => handleCustomValueChange(attr.id, v)}
              type="number"
            />
          )}
          {attr.type === 'percent' && (
            <CustomSlider
              label={attr.name}
              value={typeof attr.value === 'number' ? attr.value : 0}
              onValueChange={v => handleCustomValueChange(attr.id, v)}
            />
          )}
          {attr.type === 'levels' && attr.levels && (
            <CustomPicker
              label={attr.name}
              value={String(attr.value)}
              onValueChange={v => handleCustomValueChange(attr.id, v)}
              options={attr.levels.map(l => ({ label: l, value: l }))}
              placeholder={attr.placeholder}
            />
          )}
          {attr.example && (
            <Text className="text-zinc-400 text-xs mt-1">
              Exemplo: {attr.example}
            </Text>
          )}
        </View>
      ))}

      <Pressable
        className="bg-yl-400 p-4 rounded-lg mt-4"
        onPress={() => setShowModal(true)}
      >
        <Text className="text-zinc-900 text-center font-manropeBold">
          Adicionar Mais Atributos Biométricos
        </Text>
      </Pressable>

      {/* Modal para adicionar atributo customizado */}
      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-zinc-800 p-6 rounded-lg w-11/12 max-w-xl">
            <Text className="text-zinc-100 text-lg font-bold mb-4 text-center">
              Novo Atributo Biométrico
            </Text>
            <FormInput
              label="Nome do atributo"
              placeholder="Ex: Hemoglobina"
              value={attrName}
              onChangeText={setAttrName}
            />
            <CustomPicker
              label="Tipo"
              value={attrType}
              onValueChange={v => setAttrType(v as CustomAttributeType)}
              options={ATTRIBUTE_TYPES}
              placeholder="Selecione o tipo"
            />
            {attrType === 'levels' && (
              <FormInput
                label="Níveis (separados por vírgula)"
                placeholder="Ex: Baixo, Normal, Alto"
                value={attrLevels}
                onChangeText={setAttrLevels}
              />
            )}
            <FormInput
              label="Placeholder"
              placeholder="Ex: 13.5 (Texto que será exibido no input)"
              value={attrPlaceholder}
              onChangeText={setAttrPlaceholder}
            />
            <FormInput
              label="Exemplo de valor"
              placeholder="Ex: 13.5, 80% ou Normal"
              value={attrExample}
              onChangeText={setAttrExample}
            />
            <View className="flex-row justify-between mt-6">
              <Pressable
                className="bg-zinc-700 p-4 rounded-lg flex-1 mr-2"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-zinc-100 text-center font-manropeBold">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                className="bg-yl-400 p-4 rounded-lg flex-1 ml-2"
                onPress={handleAddCustomAttribute}
              >
                <Text className="text-zinc-900 text-center font-manropeBold">
                  Adicionar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
