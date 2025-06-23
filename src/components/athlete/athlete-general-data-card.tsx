import React, { useState } from 'react'
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import Svg, {
  Polygon,
  Line,
  Text as SvgText,
  Path,
  Circle,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  Rect,
} from 'react-native-svg'

// Mock de dados para radar
const radarLabels = [
  'PRECISÃO',
  'CHUTES',
  'DESARMES',
  'DEFESAS',
  'DRIBLES',
  'FORÇA',
  'VELOCIDADE',
]
const radarColors = [
  '#fff',
  '#FFD600',
  '#fff',
  '#fff',
  '#FFD600',
  '#fff',
  '#fff',
]
const radarAllValues: Record<string, number[]> = {
  PRECISÃO: [80, 90, 60, 40, 85, 70, 95],
  CHUTES: [90, 95, 70, 50, 80, 60, 80],
  DESARMES: [60, 70, 100, 80, 60, 80, 60],
  DEFESAS: [40, 50, 80, 100, 55, 70, 60],
  DRIBLES: [85, 80, 60, 55, 100, 80, 90],
  FORÇA: [70, 80, 60, 70, 80, 100, 80],
  VELOCIDADE: [95, 80, 60, 60, 90, 80, 100],
}

// Mock de atributos disponíveis
const attributes = [
  { key: 'PRECISÃO', label: 'PRECISÃO', color: '#00BFFF' },
  { key: 'CHUTES', label: 'CHUTES', color: '#FFD600' },
  { key: 'DESARMES', label: 'DESARMES', color: '#FF6F00' },
  { key: 'DEFESAS', label: 'DEFESAS', color: '#8E24AA' },
  { key: 'DRIBLES', label: 'DRIBLES', color: '#00E676' },
  { key: 'FORÇA', label: 'FORÇA', color: '#00C853' },
  { key: 'VELOCIDADE', label: 'VELOCIDADE', color: '#FFEB3B' },
]

// Mock de dados para gráfico de área (várias linhas)
const areaData: Record<string, number[]> = {
  CHUTES: [60, 70, 80, 75, 90, 85, 95, 100, 90, 110, 120, 130],
  DRIBLES: [40, 50, 55, 60, 65, 70, 68, 72, 75, 80, 78, 85],
  PRECISÃO: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
  DESARMES: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
  DEFESAS: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
  FORÇA: [10, 30, 60, 80, 90, 100, 110, 120, 130, 140, 150, 160],
  VELOCIDADE: [50, 55, 60, 62, 65, 70, 75, 80, 85, 90, 95, 100],
}
const areaLabels = ['1 a', '10 m', '8 m', '6 m', '4 m', '2 m', 'Atual']

type RadarChartProps = {
  size?: number
  values: number[]
  labels: string[]
  colors: string[]
  selectedLabels: string[]
}
function RadarChart({
  size = 280,
  values,
  labels,
  colors,
  selectedLabels,
}: RadarChartProps) {
  const center = (size + 100) / 2
  const radius = size / 2 - 36
  const angleStep = (2 * Math.PI) / labels.length
  // Eixos
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]
  return (
    <Svg width={size + 100} height={size + 100}>
      {/* Grades */}
      {gridLevels.map(level => {
        const r = radius * level
        const points = labels.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          return [center + r * Math.cos(angle), center + r * Math.sin(angle)]
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
      {labels.map((label, i) => {
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
        points={values
          .map((v, i) => {
            const angle = i * angleStep - Math.PI / 2
            const r = (v / 100) * radius
            return [center + r * Math.cos(angle), center + r * Math.sin(angle)]
          })
          .map(p => p.join(','))
          .join(' ')}
        fill="url(#radarGradient)"
        stroke="#FFD600"
        strokeWidth={3}
      />
      {/* Pontos */}
      {values.map((v, i) => {
        const angle = i * angleStep - Math.PI / 2
        const r = (v / 100) * radius
        return (
          <Circle
            key={`point-${labels[i]}`}
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
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2
        const x = center + (radius + 28) * Math.cos(angle)
        const y = center + (radius + 28) * Math.sin(angle)
        const isSelected = selectedLabels.includes(label)
        return (
          <SvgText
            key={`label-${label}`}
            x={x}
            y={y}
            fill={isSelected ? '#FFD600' : '#fff'}
            fontSize={16}
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            opacity={isSelected ? 1 : 0.7}
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
  )
}

type AreaChartProps = {
  width?: number
  height?: number
  data: number[][]
  colors: string[]
  labels: string[]
  legend: { label: string; color: string }[]
  xLabels: string[]
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

function AreaChart({
  width = 540,
  height = 220,
  data,
  colors,
  labels,
  legend,
  xLabels,
}: AreaChartProps) {
  if (!data.length || !data[0].length) return null
  const max = Math.max(...data.flat())
  const min = Math.min(...data.flat())
  const step = width / (data[0].length - 1)
  // Preenchimento gradiente para cada linha
  const gradients = colors.map((color, idx) => (
    <LinearGradient
      key={`grad-${labels[idx]}`}
      id={`area-gradient-${idx}`}
      x1="0"
      y1="0"
      x2="0"
      y2={height}
    >
      <Stop offset="0%" stopColor={color} stopOpacity="0.18" />
      <Stop offset="100%" stopColor={color} stopOpacity="0.04" />
    </LinearGradient>
  ))
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
        key={`area-${labels[idx]}`}
        d={path}
        fill={`url(#area-gradient-${idx})`}
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
        key={`line-${labels[idx]}`}
        d={path}
        fill="none"
        stroke={colors[idx]}
        strokeWidth={3}
      />
    )
  })
  // Legenda do eixo X
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 6,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {legend.map((item, idx) => (
          <View
            key={`legend-${item.label}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 16,
              marginTop: 4,
            }}
          >
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: item.color,
                marginRight: 6,
              }}
            />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
      <Svg width={width} height={height} style={{ width: '100%' }}>
        <Defs>{gradients}</Defs>
        {/* Áreas preenchidas */}
        {areas}
        {/* Linhas */}
        {lines}
        {/* Linhas de grade */}
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
      {/* Eixo X */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 2,
          width: '100%',
        }}
      >
        {xLabels.map((l, i) => (
          <Text
            key={`xlabel-${l}-${width}`}
            style={{
              color: '#aaa',
              fontSize: 14,
              flex: 1,
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

export default function AthleteGeneralDataCard() {
  const { width } = useWindowDimensions()
  const isSmall = width < 900
  const [selected, setSelected] = useState<string[]>(['FORÇA', 'VELOCIDADE'])
  // Para o radar, sempre mostrar todos os labels, mas destacar os selecionados
  const radarValues = radarAllValues.PRECISÃO
  const areaSelected = selected.length ? selected : ['FORÇA']
  return (
    <View
      className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8"
      style={{ padding: isSmall ? 16 : 32 }}
    >
      <Text className="text-yl-400 text-xl font-manropeBold mb-4">
        ESTATÍSTICAS GERAIS
      </Text>
      <View
        style={{
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? 24 : 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Radar e área chart */}
        <View
          style={{
            flex: 1,
            flexDirection: isSmall ? 'column' : 'row',
            gap: isSmall ? 24 : 48,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <RadarChart
            size={isSmall ? 220 : 320}
            values={radarValues}
            labels={radarLabels}
            colors={radarColors}
            selectedLabels={selected}
          />
          <View
            style={{
              minWidth: 120,
              marginRight: isSmall ? 0 : 16,
              marginBottom: isSmall ? 16 : 0,
            }}
          >
            {attributes.map(attr => (
              <TouchableOpacity
                key={attr.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  opacity: selected.includes(attr.key) ? 1 : 0.5,
                }}
                onPress={() =>
                  setSelected(sel =>
                    sel.includes(attr.key)
                      ? sel.filter(k => k !== attr.key)
                      : [...sel, attr.key]
                  )
                }
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: attr.color,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}
                >
                  {attr.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              minWidth: isSmall ? 220 : 340,
              maxWidth: 540,
              width: '100%',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Atributos selecionados para visualização:
            </Text>
            <AreaChart
              width={
                isSmall ? Math.max(width - 48, 320) : Math.min(width - 96, 540)
              }
              height={isSmall ? 140 : 220}
              data={areaSelected.map(k => areaData[k])}
              colors={areaSelected.map(
                k => attributes.find(a => a.key === k)?.color || '#fff'
              )}
              labels={areaSelected}
              legend={areaSelected.map(k => ({
                label: k,
                color: attributes.find(a => a.key === k)?.color || '#fff',
              }))}
              xLabels={['1 a', '10 m', '8 m', '6 m', '4 m', '2 m', 'Atual']}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
