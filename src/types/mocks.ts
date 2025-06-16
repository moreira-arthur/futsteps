// TODO: Integrar esses dados com a API futuramente

export type Player = {
  id: number
  number: number
  name: string
  age: number
  position: string
  teamType: 'titular' | 'reserva'
}

export type InjuredPlayer = Player & {
  injury: string
  returnDate: string
}

export type Stat = {
  label: string
  value: number
  color: string
}

export const mockTraining = {
  id: 1,
  formationTitular: '4-3-3',
  formationReserve: '3-4-3',
  players: [
    // Titulares (4-3-3)
    {
      id: 1,
      number: 1,
      name: 'Dianne Russell',
      age: 28,
      position: 'GK',
      teamType: 'titular',
    },
    {
      id: 2,
      number: 2,
      name: 'Devon Lane',
      age: 25,
      position: 'LB',
      teamType: 'titular',
    },
    {
      id: 3,
      number: 3,
      name: 'Floyd Miles',
      age: 27,
      position: 'CB',
      teamType: 'titular',
    },
    {
      id: 4,
      number: 4,
      name: 'Jane Cooper',
      age: 24,
      position: 'CB2',
      teamType: 'titular',
    },
    {
      id: 5,
      number: 5,
      name: 'Arlene McCoy',
      age: 26,
      position: 'RB',
      teamType: 'titular',
    },
    {
      id: 6,
      number: 6,
      name: 'Esther Howard',
      age: 23,
      position: 'CDM',
      teamType: 'titular',
    },
    {
      id: 7,
      number: 7,
      name: 'Guy Hawkins',
      age: 29,
      position: 'CM',
      teamType: 'titular',
    },
    {
      id: 8,
      number: 8,
      name: 'João Palhinha',
      age: 28,
      position: 'CM2',
      teamType: 'titular',
    },
    {
      id: 9,
      number: 9,
      name: 'C. Ronaldo',
      age: 37,
      position: 'ST',
      teamType: 'titular',
    },
    {
      id: 10,
      number: 10,
      name: 'João Félix',
      age: 22,
      position: 'LW',
      teamType: 'titular',
    },
    {
      id: 11,
      number: 11,
      name: 'Ricardo Horta',
      age: 27,
      position: 'RW',
      teamType: 'titular',
    },
    // Reservas (3-4-3)
    {
      id: 12,
      number: 12,
      name: 'T. Courtois',
      age: 30,
      position: 'GK',
      teamType: 'reserva',
    },
    {
      id: 13,
      number: 13,
      name: 'Wout Faes',
      age: 28,
      position: 'CB',
      teamType: 'reserva',
    },
    {
      id: 14,
      number: 14,
      name: 'T. Meunier',
      age: 31,
      position: 'CB2',
      teamType: 'reserva',
    },
    {
      id: 15,
      number: 15,
      name: 'A. Theate',
      age: 25,
      position: 'CB3',
      teamType: 'reserva',
    },
    {
      id: 16,
      number: 16,
      name: 'Kevin D.B',
      age: 30,
      position: 'LM',
      teamType: 'reserva',
    },
    {
      id: 17,
      number: 17,
      name: 'Axel Witsel',
      age: 33,
      position: 'CM',
      teamType: 'reserva',
    },
    {
      id: 18,
      number: 18,
      name: 'H. Vanaken',
      age: 29,
      position: 'CM2',
      teamType: 'reserva',
    },
    {
      id: 19,
      number: 19,
      name: 'A. Onana',
      age: 26,
      position: 'RM',
      teamType: 'reserva',
    },
    {
      id: 20,
      number: 20,
      name: 'R. Lukaku',
      age: 28,
      position: 'ST',
      teamType: 'reserva',
    },
    {
      id: 21,
      number: 21,
      name: 'E. Hazard',
      age: 31,
      position: 'LW',
      teamType: 'reserva',
    },
    {
      id: 22,
      number: 22,
      name: 'D. Mertens',
      age: 34,
      position: 'RW',
      teamType: 'reserva',
    },
  ] as Player[],
}

export const mockResults = [
  {
    home: 'Chelsea',
    away: 'Leicester',
    date: '27 Aug 2022 01:40',
    homeLogo: null,
    awayLogo: null,
  },
  {
    home: 'Brighton',
    away: 'Leeds',
    date: '27 Aug 2022 00:10',
    homeLogo: null,
    awayLogo: null,
  },
  {
    home: 'Man City',
    away: 'Crystal Pa',
    date: '29 Aug 2022 19:40',
    homeLogo: null,
    awayLogo: null,
  },
  {
    home: 'Man City',
    away: 'Crystal Pa',
    date: '29 Aug 2022 19:40',
    homeLogo: null,
    awayLogo: null,
  },
  {
    home: 'Man City',
    away: 'Crystal Pa',
    date: '29 Aug 2022 19:40',
    homeLogo: null,
    awayLogo: null,
  },
]

export const mockStats: Stat[] = [
  { label: 'Posse de Bola', value: 65, color: '#22c55e' },
  { label: 'Finalizações', value: 12, color: '#eab308' },
  { label: 'Chutes no Gol', value: 5, color: '#eab308' },
  { label: 'Faltas', value: 8, color: '#ef4444' },
  { label: 'Escanteios', value: 6, color: '#3b82f6' },
  { label: 'Impedimentos', value: 3, color: '#f97316' },
]

export const mockInjuredPlayers: InjuredPlayer[] = [
  {
    id: 23,
    number: 23,
    name: 'Rafael Leão',
    age: 24,
    position: 'LW',
    teamType: 'titular',
    injury: 'Lesão no joelho',
    returnDate: '15/03/2024',
  },
  {
    id: 24,
    number: 24,
    name: 'Bernardo Silva',
    age: 29,
    position: 'CM',
    teamType: 'titular',
    injury: 'Entorse no tornozelo',
    returnDate: '20/03/2024',
  },
]

export const mockPlayersTable = [
  {
    highlight: true,
    name: 'Dianne Russell',
    position: 'Striker',
    date: 'March 23, 2013',
    performance: 67,
  },
  {
    highlight: false,
    name: 'Floyd Miles',
    position: 'Left Back',
    date: 'May 9, 2014',
    performance: 69,
  },
  {
    highlight: false,
    name: 'Jane Cooper',
    position: 'Right Back',
    date: 'December 19, 2013',
    performance: 78,
  },
  {
    highlight: true,
    name: 'Arlene McCoy',
    position: 'Left Wing',
    date: 'April 28, 2016',
    performance: 77,
  },
  {
    highlight: false,
    name: 'Esther Howard',
    position: 'Attacking Mid',
    date: 'March 6, 2018',
    performance: 100,
  },
  {
    highlight: false,
    name: 'Devon Lane',
    position: 'Center Back',
    date: 'May 31, 2015',
    performance: 44,
  },
  {
    highlight: false,
    name: 'Guy Hawkins',
    position: 'Goalkeeper',
    date: 'August 2, 2013',
    performance: 100,
  },
]

export const mockPlayers = [
  {
    id: 1,
    number: 1,
    name: 'João',
    age: 28,
    position: 'GK',
    teamType: 'titular',
  },
  {
    id: 2,
    number: 2,
    name: 'Carlos',
    age: 25,
    position: 'LB',
    teamType: 'titular',
  },
  {
    id: 3,
    number: 3,
    name: 'Pedro',
    age: 27,
    position: 'CB',
    teamType: 'titular',
  },
  {
    id: 4,
    number: 4,
    name: 'Lucas',
    age: 24,
    position: 'CB',
    teamType: 'titular',
  },
  {
    id: 5,
    number: 5,
    name: 'Rafael',
    age: 26,
    position: 'RB',
    teamType: 'titular',
  },
  {
    id: 6,
    number: 6,
    name: 'André',
    age: 29,
    position: 'CDM',
    teamType: 'titular',
  },
  {
    id: 7,
    number: 7,
    name: 'Bruno',
    age: 23,
    position: 'CM',
    teamType: 'titular',
  },
  {
    id: 8,
    number: 8,
    name: 'Felipe',
    age: 22,
    position: 'CM',
    teamType: 'titular',
  },
  {
    id: 9,
    number: 9,
    name: 'Thiago',
    age: 30,
    position: 'LW',
    teamType: 'titular',
  },
  {
    id: 10,
    number: 10,
    name: 'Gustavo',
    age: 21,
    position: 'ST',
    teamType: 'titular',
  },
  {
    id: 11,
    number: 11,
    name: 'Marcos',
    age: 20,
    position: 'RW',
    teamType: 'titular',
  },
  // Reservas
  {
    id: 12,
    number: 12,
    name: 'Ricardo',
    age: 27,
    position: 'GK',
    teamType: 'reserva',
  },
  {
    id: 13,
    number: 13,
    name: 'Eduardo',
    age: 24,
    position: 'LB',
    teamType: 'reserva',
  },
  {
    id: 14,
    number: 14,
    name: 'Vitor',
    age: 25,
    position: 'CB',
    teamType: 'reserva',
  },
  {
    id: 15,
    number: 15,
    name: 'Henrique',
    age: 23,
    position: 'RB',
    teamType: 'reserva',
  },
  {
    id: 16,
    number: 16,
    name: 'Matheus',
    age: 22,
    position: 'CM',
    teamType: 'reserva',
  },
  {
    id: 17,
    number: 17,
    name: 'Paulo',
    age: 28,
    position: 'ST',
    teamType: 'reserva',
  },
]

export const mockFormationTitular = '4-3-3'
export const mockFormationReserve = '4-3-3'
