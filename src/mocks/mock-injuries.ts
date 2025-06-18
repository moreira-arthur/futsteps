import type { Player } from './mock-training'

export type InjuredPlayer = Player & {
  injury: string
  returnDate: string
}

export const mockInjuries: InjuredPlayer[] = [
  {
    id: 23,
    number: 23,
    name: 'Lucas Silva',
    age: 26,
    position: 'CM',
    teamType: 'titular',
    injury: 'Lesão muscular',
    returnDate: '2024-07-10',
  },
  {
    id: 24,
    number: 24,
    name: 'Pedro Santos',
    age: 29,
    position: 'ST',
    teamType: 'reserva',
    injury: 'Entorse no tornozelo',
    returnDate: '2024-07-20',
  },
]
