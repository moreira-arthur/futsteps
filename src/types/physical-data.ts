export type PhysicalCondition =
  | 'Muito Fraco'
  | 'Fraco'
  | 'Regular'
  | 'Forte'
  | 'Muito Forte'

export type HydrationLevel = 'Ruim' | 'Regular' | 'Bom' | 'Ótimo'

export interface PhysicalData {
  // Dados Físicos
  physicalCondition: PhysicalCondition
  weight: number
  height: number
  imc: number
  bodyFatPercentage: number
  leanMassPercentage: number

  // Dados de Aptidão Física
  movementCapabilities: {
    agility: number
    speedTest: number
    aerobicEndurance: number
  }
  strengthCapabilities: {
    muscleStrength: number
    musclePower: number
    anaerobicEndurance: number
  }
  flexibilityCapabilities: {
    flexibility: number
    balance: number
  }
  coordinationCapabilities: {
    coordination: number
    reaction: number
  }

  // Dados Biométricos
  hydrationLevel: HydrationLevel
  maxHeartRate: number
  restingHeartRate: number
  oxygenSaturation: number
  systolicBloodPressure: number
  diastolicBloodPressure: number
  bloodLactateLevel: number
  additionalBiometrics?: Record<string, number>

  // Observações
  observations?: string
}
 