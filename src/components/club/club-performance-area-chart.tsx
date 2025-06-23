import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import Svg, { Path, Line, Defs, LinearGradient, Stop } from 'react-native-svg'

const ATTRIBUTES = [
  { key: 'velocidade', label: 'Velocidade Média', color: '#00BFFF' },
  { key: 'chutes', label: 'Chutes', color: '#FFD600' },
  { key: 'passe', label: 'Passe', color: '#00FF00' },
  { key: 'defesa', label: 'Defesa', color: '#FF4747' },
  { key: 'rendimento', label: 'Rendimento', color: '#FFC107' },
]

// Mock de dados para cada atributo
const perfData = {
  velocidade: {
    jogo: [22, 23, 21, 24, 23, 22, 25, 24, 23, 22, 23, 24],
    treino: [21, 22, 22, 23, 22, 21, 23, 22, 22, 21, 22, 23],
  },
  chutes: {
    jogo: [10, 12, 8, 11, 13, 9, 14, 12, 10, 11, 13, 12],
    treino: [8, 9, 7, 10, 9, 8, 10, 9, 8, 9, 10, 9],
  },
  passe: {
    jogo: [50, 55, 52, 54, 56, 53, 57, 55, 54, 53, 56, 55],
    treino: [48, 50, 49, 51, 50, 48, 52, 50, 49, 48, 51, 50],
  },
  defesa: {
    jogo: [5, 6, 4, 7, 6, 5, 8, 7, 6, 5, 7, 6],
    treino: [4, 5, 3, 6, 5, 4, 7, 6, 5, 4, 6, 5],
  },
  rendimento: {
    jogo: [80, 85, 78, 90, 88, 82, 91, 87, 89, 85, 90, 88],
    treino: [75, 80, 77, 82, 80, 78, 85, 80, 81, 79, 83, 82],
  },
}

function getSmoothPath(points: [number, number][]) {
  if (points.length < 2) return ''
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i === 0 ? i : i - 1]
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    const [x3, y3] = points[i + 2] || [x2, y2]
    const cp1x = x1 + (x2 - x0) / 6
    const cp1y = y1 + (y2 - y0) / 6
    const cp2x = x2 - (x3 - x1) / 6
    const cp2y = y2 - (y3 - y1) / 6
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`
  }
  return d
}

// Função utilitária para cor complementar simples
function getComplementaryColor(hex: string) {
  let color = hex.replace('#', '')
  if (color.length === 3)
    color = color
      .split('')
      .map(c => c + c)
      .join('')
  if (color.length !== 6) return '#888888'
  const r = (255 - Number.parseInt(color.substring(0, 2), 16))
    .toString(16)
    .padStart(2, '0')
  const g = (255 - Number.parseInt(color.substring(2, 4), 16))
    .toString(16)
    .padStart(2, '0')
  const b = (255 - Number.parseInt(color.substring(4, 6), 16))
    .toString(16)
    .padStart(2, '0')
  return `#${r}${g}${b}`
}

function AreaChart({
  data,
  color,
  width = 540,
  height = 220,
  xLabels,
}: {
  data: number[][]
  color: string
  width?: number
  height?: number
  xLabels: string[]
}) {
  if (!data.length || !data[0].length) return null
  const max = Math.max(...data.flat())
  const min = Math.min(...data.flat())
  const step = width / (data[0].length - 1)
  const compColor = getComplementaryColor(color)
  const gradients = [
    <LinearGradient
      key="grad-jogo"
      id="area-gradient-club-jogo"
      x1="0"
      y1="0"
      x2="0"
      y2={height}
    >
      <Stop offset="0%" stopColor={color} stopOpacity="0.18" />
      <Stop offset="100%" stopColor={color} stopOpacity="0.04" />
    </LinearGradient>,
    <LinearGradient
      key="grad-treino"
      id="area-gradient-club-treino"
      x1="0"
      y1="0"
      x2="0"
      y2={height}
    >
      <Stop offset="0%" stopColor={compColor} stopOpacity="0.18" />
      <Stop offset="100%" stopColor={compColor} stopOpacity="0.04" />
    </LinearGradient>,
  ]
  const areas = data.map((serie, idx) => {
    const points = serie.map(
      (v, i) =>
        [
          i * step,
          height - ((v - min) / (max - min + 1e-6)) * (height - 30),
        ] as [number, number]
    )
    const path = `${getSmoothPath(points)} L${width},${height} L0,${height} Z`
    return (
      <Path
        key={`area-${idx}-${color}`}
        d={path}
        fill={`url(#area-gradient-club-${idx === 0 ? 'jogo' : 'treino'})`}
        stroke="none"
      />
    )
  })
  const lines = data.map((serie, idx) => {
    const points = serie.map(
      (v, i) =>
        [
          i * step,
          height - ((v - min) / (max - min + 1e-6)) * (height - 30),
        ] as [number, number]
    )
    const path = getSmoothPath(points)
    return (
      <Path
        key={`line-${idx}-${color}`}
        d={path}
        fill="none"
        stroke={idx === 0 ? color : compColor}
        strokeWidth={3}
      />
    )
  })
  return (
    <View
      style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Svg
        width={width}
        height={height}
        style={{ width: width, alignSelf: 'center' }}
      >
        <Defs>{gradients}</Defs>
        {areas}
        {lines}
        {[...Array(6)].map((_, i) => (
          <Line
            key={`gridline-${i}-${height}`}
            x1={0}
            y1={height - ((i + 1) * (height - 30)) / 7}
            x2={width}
            y2={height - ((i + 1) * (height - 30)) / 7}
            stroke="#888"
            strokeDasharray="6 6"
            strokeWidth={1}
          />
        ))}
      </Svg>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 2,
          width: width,
        }}
      >
        {xLabels.map(l => (
          <Text
            key={`xlabel-club-${l}-${width}`}
            style={{
              color: '#aaa',
              fontSize: 14,
              width: width / xLabels.length,
              textAlign: 'center',
            }}
          >
            {l}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default function ClubPerformanceAreaChart() {
  const { width } = useWindowDimensions()
  const isSmall = width < 900
  const [selectedAttr, setSelectedAttr] = useState(ATTRIBUTES[0].key)
  const [showFilter, setShowFilter] = useState(false)
  const attr = ATTRIBUTES.find(a => a.key === selectedAttr) || ATTRIBUTES[0]
  const data = perfData[selectedAttr as keyof typeof perfData]
  const chartWidth = isSmall
    ? Math.max(width - 64, 320)
    : Math.min(width - 128, 900)
  const height = isSmall ? 140 : 220
  const xLabels = [
    'Jogo 1',
    'Jogo 2',
    'Jogo 3',
    'Jogo 4',
    'Jogo 5',
    'Jogo 6',
    'Jogo 7',
    'Jogo 8',
    'Jogo 9',
    'Jogo 10',
    'Jogo 11',
    'Jogo 12',
  ]
  const compColor = getComplementaryColor(attr.color)
  return (
    <View
      className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8 p-6"
      style={{
        padding: isSmall ? 16 : 32,
        justifyContent: 'center',
      }}
    >
      {/* Filtro de atributo */}
      <View className="flex flex-row gap-0">
        <View style={{ marginBottom: 12, flex: 1 }}>
          <Text className="text-yl-400 text-xl font-manropeBold mb-4">
            ÚLTIMAS PERFORMANCES
          </Text>
          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            style={{
              backgroundColor: attr.color,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 8,
              alignSelf: 'flex-start',
              marginBottom: 8,
            }}
          >
            <Text
              style={{ color: '#18181b', fontWeight: 'bold', fontSize: 16 }}
            >
              {attr.label}
            </Text>
          </TouchableOpacity>
          <Modal
            visible={showFilter}
            transparent
            animationType="fade"
            onRequestClose={() => setShowFilter(false)}
          >
            <Pressable
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
              onPress={() => setShowFilter(false)}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 100,
                  left: 32,
                  right: 32,
                  backgroundColor: '#23232b',
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: '0px 4px 16px rgba(0,0,0,0.18)',
                }}
              >
                {ATTRIBUTES.map(a => (
                  <TouchableOpacity
                    key={a.key}
                    onPress={() => {
                      setSelectedAttr(a.key)
                      setShowFilter(false)
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      backgroundColor:
                        selectedAttr === a.key ? a.color : 'transparent',
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: selectedAttr === a.key ? '#18181b' : '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {a.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: attr.color,
              }}
            />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
              Jogo
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: compColor,
              }}
            />
            <Text style={{ color: '#aaa', fontWeight: 'bold', fontSize: 15 }}>
              Treino
            </Text>
          </View>
        </View>
      </View>
      <AreaChart
        data={[data.jogo, data.treino]}
        color={attr.color}
        width={chartWidth}
        height={height}
        xLabels={xLabels}
      />
    </View>
  )
}
