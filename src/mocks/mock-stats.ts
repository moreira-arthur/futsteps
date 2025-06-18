export type Stat = {
  label: string
  value: number
  color: string
  max: number
}

export const mockStats: Stat[] = [
  { label: 'Posse de Bola', value: 65, color: '#22c55e', max: 100 },
  { label: 'Finalizações', value: 12, color: '#eab308', max: 20 },
  { label: 'Chutes no Gol', value: 5, color: '#eab308', max: 15 },
  { label: 'Faltas', value: 8, color: '#ef4444', max: 20 },
  { label: 'Escanteios', value: 7, color: '#3b82f6', max: 15 },
  { label: 'Impedimentos', value: 3, color: '#ef4444', max: 10 },
  { label: 'Passes Certos', value: 85, color: '#22c55e', max: 100 },
  { label: 'Dribles', value: 15, color: '#eab308', max: 30 },
  { label: 'Desarmes', value: 12, color: '#3b82f6', max: 25 },
  { label: 'Defesas', value: 4, color: '#22c55e', max: 10 },
  { label: 'Cartões Amarelos', value: 2, color: '#eab308', max: 5 },
  { label: 'Cartões Vermelhos', value: 0, color: '#ef4444', max: 2 },
]
