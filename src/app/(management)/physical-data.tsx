import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import AthleteInfoCard from '../../components/athlete/athlete-info-card'
import BiometricDataTab from '../../components/physical-data/biometric-data-tab'
import FinalizationTab from '../../components/physical-data/finalization-tab'
import PhysicalDataTab from '../../components/physical-data/physical-data-tab'
import PhysicalFitnessTab from '../../components/physical-data/physical-fitness-tab'
import type {
  HydrationLevel,
  PhysicalCondition,
} from '../../types/physical-data'

// Mock de atletas (temporário até implementar a API)
const ATHLETES = {
  '1': {
    id: '1',
    name: 'Frankie de Jong',
    position: 'Meia',
    age: 27,
    number: 45,
    team: {
      name: 'Barcelona',
      logo: require('../../assets/clubs/barcelona.png'),
    },
    photo: require('../../assets/players/frakie-de-jong.png'),
  },
  '2': {
    id: '2',
    name: 'Gerard Piqué',
    position: 'Zagueiro',
    age: 35,
    number: 3,
    team: {
      name: 'Barcelona',
      logo: require('../../assets/clubs/barcelona.png'),
    },
    photo: require('../../assets/players/gerad-pique.png'),
  },
  '3': {
    id: '3',
    name: 'Memphis Depay',
    position: 'Atacante',
    age: 28,
    number: 9,
    team: {
      name: 'Barcelona',
      logo: require('../../assets/clubs/barcelona.png'),
    },
    photo: require('../../assets/players/memphis-dapay.png'),
  },
}

export default function PhysicalData() {
  const { id } = useLocalSearchParams()
  const { width } = useWindowDimensions()
  const isSmallScreen = width < 700
  const [activeTab, setActiveTab] = useState(0)
  const [physicalCondition, setPhysicalCondition] =
    useState<PhysicalCondition>('Regular')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bodyFatPercentage, setBodyFatPercentage] = useState('')
  const [leanMassPercentage, setLeanMassPercentage] = useState('')

  // Capacidades de Movimento e Deslocamento
  const [agility, setAgility] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [aerobicEndurance, setAerobicEndurance] = useState(0)

  // Capacidades de Força e Potência
  const [muscularStrength, setMuscularStrength] = useState(0)
  const [muscularPower, setMuscularPower] = useState(0)
  const [anaerobicEndurance, setAnaerobicEndurance] = useState(0)

  // Capacidades de Flexibilidade e Equilíbrio
  const [flexibility, setFlexibility] = useState(0)
  const [balance, setBalance] = useState(0)

  // Capacidades de Coordenação e Reação
  const [coordination, setCoordination] = useState(0)
  const [reaction, setReaction] = useState(0)

  // Dados Biométricos
  const [hydrationLevel, setHydrationLevel] =
    useState<HydrationLevel>('Regular')
  const [maxHeartRate, setMaxHeartRate] = useState('')
  const [restingHeartRate, setRestingHeartRate] = useState('')
  const [oxygenSaturation, setOxygenSaturation] = useState(0)
  const [systolicBloodPressure, setSystolicBloodPressure] = useState('')
  const [diastolicBloodPressure, setDiastolicBloodPressure] = useState('')
  const [bloodLactate, setBloodLactate] = useState('')

  // Finalização
  const [observation, setObservation] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const [showTabs, setShowTabs] = useState(false)

  const selectedAthlete = ATHLETES[id as keyof typeof ATHLETES]

  const handleFinish = () => {
    setShowSuccessModal(true)
  }

  const handleCancel = () => {
    setShowCancelModal(true)
  }

  const handleBack = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
    } else {
      setShowCancelModal(true)
    }
  }

  const handleNext = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1)
    }
  }

  const handleReturnToManagement = () => {
    router.back()
  }

  const handleContinue = () => {
    setShowCancelModal(false)
  }

  const TABS = [
    { key: 0, label: 'Dados Físicos' },
    { key: 1, label: 'Dados de Aptidão Física' },
    { key: 2, label: 'Dados Biométricos' },
    { key: 3, label: 'Finalização' },
  ]

  if (!selectedAthlete) {
    return (
      <View className="flex-1 bg-zinc-900 items-center justify-center">
        <Text className="text-zinc-100 text-lg font-manropeBold">
          Atleta não encontrado
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-zinc-900">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-4 py-6 items-center justify-center">
          <AthleteInfoCard athlete={selectedAthlete} />
        </View>

        {/* Navegação de abas responsiva */}
        <View className="px-4 mb-4">
          {isSmallScreen ? (
            <View>
              <Pressable
                className="bg-zinc-800 rounded-full px-4 py-3 flex-row items-center justify-between"
                onPress={() => setShowTabs(!showTabs)}
              >
                <Text className="text-zinc-100 font-manropeBold text-base">
                  {TABS.find(tab => tab.key === activeTab)?.label}
                </Text>
                <Text className="text-zinc-400 ml-2">
                  {showTabs ? '▲' : '▼'}
                </Text>
              </Pressable>
              {showTabs && (
                <View className="mt-2 bg-zinc-800 rounded-lg overflow-hidden">
                  {TABS.map(tab => (
                    <Pressable
                      key={tab.key}
                      onPress={() => {
                        setActiveTab(tab.key)
                        setShowTabs(false)
                      }}
                      className={`px-4 py-3 border-b border-zinc-700 ${activeTab === tab.key ? 'bg-zinc-900' : ''}`}
                    >
                      <Text
                        className={`text-base font-manropeBold ${activeTab === tab.key ? 'text-yl-400' : 'text-zinc-100'}`}
                      >
                        {tab.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View className="flex-row bg-zinc-800 rounded-full p-1">
              {TABS.map(tab => (
                <Pressable
                  key={tab.key}
                  className={`flex-1 items-center justify-center rounded-full py-3 transition-all duration-200 ${activeTab === tab.key ? 'bg-zinc-900' : ''}`}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Text
                    className={`font-manropeBold text-base ${activeTab === tab.key ? 'text-yl-400' : 'text-zinc-100'}`}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View className="p-4">
          {activeTab === 0 && (
            <PhysicalDataTab
              physicalCondition={physicalCondition}
              onPhysicalConditionChange={setPhysicalCondition}
              weight={weight}
              onWeightChange={setWeight}
              height={height}
              onHeightChange={setHeight}
              bodyFatPercentage={bodyFatPercentage}
              onBodyFatPercentageChange={setBodyFatPercentage}
              leanMassPercentage={leanMassPercentage}
              onLeanMassPercentageChange={setLeanMassPercentage}
            />
          )}

          {activeTab === 1 && (
            <PhysicalFitnessTab
              agility={agility}
              onAgilityChange={setAgility}
              speed={speed}
              onSpeedChange={setSpeed}
              aerobicEndurance={aerobicEndurance}
              onAerobicEnduranceChange={setAerobicEndurance}
              muscularStrength={muscularStrength}
              onMuscularStrengthChange={setMuscularStrength}
              muscularPower={muscularPower}
              onMuscularPowerChange={setMuscularPower}
              anaerobicEndurance={anaerobicEndurance}
              onAnaerobicEnduranceChange={setAnaerobicEndurance}
              flexibility={flexibility}
              onFlexibilityChange={setFlexibility}
              balance={balance}
              onBalanceChange={setBalance}
              coordination={coordination}
              onCoordinationChange={setCoordination}
              reaction={reaction}
              onReactionChange={setReaction}
            />
          )}

          {activeTab === 2 && (
            <BiometricDataTab
              hydrationLevel={hydrationLevel}
              onHydrationLevelChange={setHydrationLevel}
              maxHeartRate={maxHeartRate}
              onMaxHeartRateChange={setMaxHeartRate}
              restingHeartRate={restingHeartRate}
              onRestingHeartRateChange={setRestingHeartRate}
              oxygenSaturation={oxygenSaturation}
              onOxygenSaturationChange={setOxygenSaturation}
              systolicBloodPressure={systolicBloodPressure}
              onSystolicBloodPressureChange={setSystolicBloodPressure}
              diastolicBloodPressure={diastolicBloodPressure}
              onDiastolicBloodPressureChange={setDiastolicBloodPressure}
              bloodLactate={bloodLactate}
              onBloodLactateChange={setBloodLactate}
              onAddMoreBiometrics={() => {
                // TODO: Implementar lógica para adicionar mais atributos biométricos
              }}
            />
          )}

          {activeTab === 3 && (
            <FinalizationTab
              observation={observation}
              onObservationChange={setObservation}
              onFinish={handleFinish}
              onCancel={handleCancel}
              onBack={handleBack}
            />
          )}
        </View>
      </ScrollView>

      {/* Botões de navegação fixos */}
      <View className="absolute bottom-4 left-4 right-4 flex-row justify-between gap-4">
        <Pressable
          className="bg-yl-400 p-4 rounded-lg flex-1"
          onPress={handleBack}
        >
          <Text className="text-zinc-900 font-manropeBold text-center">
            Voltar
          </Text>
        </Pressable>
        {activeTab < TABS.length - 1 && (
          <Pressable
            className="bg-yl-400 p-4 rounded-lg flex-1 ml-2"
            onPress={handleNext}
          >
            <Text className="text-zinc-900 font-manropeBold text-center">
              Próximo
            </Text>
          </Pressable>
        )}
      </View>

      {/* Modal de Sucesso */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-zinc-800 p-6 rounded-lg w-4/5">
            <Text className="text-zinc-100 text-lg text-center mb-6">
              Dados registrados com sucesso
            </Text>
            <Pressable
              className="bg-yl-400 p-4 rounded-lg"
              onPress={handleReturnToManagement}
            >
              <Text className="text-zinc-900 text-center font-manropeBold">
                Voltar para Gerenciamento
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal de Cancelamento */}
      <Modal visible={showCancelModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-zinc-800 p-6 rounded-lg w-4/5">
            <Text className="text-zinc-100 text-lg text-center mb-6">
              Dados não registrados
            </Text>
            <View className="flex-row justify-between">
              <Pressable
                className="bg-zinc-700 p-4 rounded-lg flex-1 mr-2"
                onPress={handleContinue}
              >
                <Text className="text-zinc-100 text-center font-manropeBold">
                  Continuar
                </Text>
              </Pressable>
              <Pressable
                className="bg-yl-400 p-4 rounded-lg flex-1 ml-2"
                onPress={handleReturnToManagement}
              >
                <Text className="text-zinc-900 text-center font-manropeBold">
                  Voltar para Gerenciamento
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
