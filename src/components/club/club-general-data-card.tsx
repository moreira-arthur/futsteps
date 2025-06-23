import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import Svg, {
  Polygon,
  Line,
  Text as SvgText,
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg'

const attributes = [
  { key: 'velocidade', label: 'Velocidade Média', color: '#00BFFF' },
  { key: 'chutes', label: 'Chutes', color: '#FFD600' },
  { key: 'rendimento', label: 'Rendimento', color: '#FFC107' },
  { key: 'passe', label: 'Passe', color: '#00FF00' },
  { key: 'defesa', label: 'Defesa', color: '#FF4747' },
]

const radarLabels = attributes.map(a => a.label)
const radarColors = attributes.map(a => a.color)

// Mock de valores médios do clube para cada atributo
const radarValues = [80, 65, 90, 70, 85]

// Mock de últimos jogos do clube
const lastGames = [
  {
    id: 1,
    opponent: 'Real Madrid',
    date: '2023-10-01',
    score: '2-1',
    values: [85, 70, 95, 75, 90],
  },
  {
    id: 2,
    opponent: 'Atletico Madrid',
    date: '2023-09-25',
    score: '3-0',
    values: [75, 90, 50, 65, 50],
  },
  {
    id: 3,
    opponent: 'Sevilla',
    date: '2023-09-18',
    score: '1-1',
    values: [70, 55, 80, 60, 75],
  },
  {
    id: 4,
    opponent: 'Valencia',
    date: '2023-09-11',
    score: '4-2',
    values: [80, 65, 90, 70, 85],
  },
  {
    id: 5,
    opponent: 'Athletic Bilbao',
    date: '2023-09-04',
    score: '2-0',
    values: [75, 60, 85, 65, 80],
  },
]

export default function ClubGeneralDataCard({
  selected,
  setSelected,
}: { selected: string[]; setSelected: (s: string[]) => void }) {
  const { width } = useWindowDimensions()
  const isSmall = width < 900
  const size = isSmall ? 220 : 320
  const center = (size + 40) / 2
  const radius = size / 2 - 36
  const angleStep = (2 * Math.PI) / radarLabels.length
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]
  const [selectedGame, setSelectedGame] = useState(lastGames[0].id)

  const selectedGameData =
    lastGames.find(game => game.id === selectedGame) || lastGames[0]

  return (
    <View
      className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8"
      style={{ padding: isSmall ? 16 : 32 }}
    >
      <Text className="text-yl-400 text-xl font-manropeBold mb-4">
        ESTATÍSTICAS GERAIS DO CLUBE
      </Text>
      <View
        style={{
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? 24 : 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Lista de últimos jogos */}
        <ScrollView
          style={{
            maxHeight: 300,
            width: isSmall ? '100%' : 200,
            marginRight: isSmall ? 0 : 16,
          }}
        >
          {lastGames.map(game => (
            <TouchableOpacity
              key={game.id}
              style={{
                padding: 10,
                backgroundColor:
                  selectedGame === game.id ? '#333' : 'transparent',
                borderRadius: 8,
                marginBottom: 8,
              }}
              onPress={() => setSelectedGame(game.id)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                {game.opponent}
              </Text>
              <Text style={{ color: '#aaa', fontSize: 14 }}>
                {game.date} - {game.score}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Radar Chart */}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size + 40} height={size + 40}>
            {/* Grades */}
            {gridLevels.map(level => {
              const r = radius * level
              const points = radarLabels.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2
                return [
                  center + r * Math.cos(angle),
                  center + r * Math.sin(angle),
                ]
              })
              const pointsStr = points.map(p => p.join(',')).join(' ')
              return (
                <Polygon
                  key={`grid-${level}`}
                  points={pointsStr}
                  fill="none"
                  stroke="#888"
                  strokeWidth={1}
                />
              )
            })}
            {/* Eixos */}
            {radarLabels.map((label, i) => {
              const angle = i * angleStep - Math.PI / 2
              return (
                <Line
                  key={`axis-${label}`}
                  x1={center}
                  y1={center}
                  x2={center + radius * Math.cos(angle)}
                  y2={center + radius * Math.sin(angle)}
                  stroke="#888"
                  strokeWidth={1}
                />
              )
            })}
            {/* Polígono */}
            <Polygon
              points={selectedGameData.values
                .map((v, i) => {
                  const angle = i * angleStep - Math.PI / 2
                  const r = (v / 100) * radius
                  return [
                    center + r * Math.cos(angle),
                    center + r * Math.sin(angle),
                  ]
                })
                .map(p => p.join(','))
                .join(' ')}
              fill="url(#radarGradient)"
              stroke="#FFD600"
              strokeWidth={3}
            />
            {/* Pontos */}
            {selectedGameData.values.map((v, i) => {
              const angle = i * angleStep - Math.PI / 2
              const r = (v / 100) * radius
              return (
                <Circle
                  key={`point-${radarLabels[i]}`}
                  cx={center + r * Math.cos(angle)}
                  cy={center + r * Math.sin(angle)}
                  r={7}
                  fill="#fff"
                  stroke="#FFD600"
                  strokeWidth={3}
                />
              )
            })}
            {/* Labels */}
            {radarLabels.map((label, i) => {
              const angle = i * angleStep - Math.PI / 2
              const x = center + (radius + 32) * Math.cos(angle)
              const y = center + (radius + 32) * Math.sin(angle)
              return (
                <SvgText
                  key={`label-${label}`}
                  x={x}
                  y={y}
                  fill="#fff"
                  fontSize={16}
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {label}
                </SvgText>
              )
            })}
            {/* Gradient */}
            <Defs>
              <RadialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#00FFD0" stopOpacity="0.2" />
                <Stop offset="100%" stopColor="#FFD600" stopOpacity="0.15" />
              </RadialGradient>
            </Defs>
          </Svg>
        </View>
      </View>
    </View>
  )
}
