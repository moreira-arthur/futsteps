import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import Svg, { Path, Line, Defs, LinearGradient, Stop } from 'react-native-svg'

// Função para suavizar linhas com curvas de Bézier (Catmull-Rom to Bezier)
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

function generateXLabels(points: number, isSmall: boolean) {
  // Gera labels de tempo para o eixo X
  if (points <= 7) {
    return ['0min', '15min', '30min', '45min', '60min', '75min', '90min'].slice(
      0,
      points
    )
  }
  // Para muitos pontos, mostra só alguns e abrevia
  const step = Math.floor(90 / (points - 1))
  return Array.from({ length: points }, (_, i) => `${i * step}m`)
}

type AreaChartPerformanceProps = {
  width?: number
  height?: number
  data: number[][]
  colors: string[]
  labels: string[]
  xLabels: string[]
  legend: Array<{ label: string; color: string }>
}

function AreaChartPerformance({
  width = 540,
  height = 220,
  data,
  colors,
  labels,
  xLabels,
  legend,
}: AreaChartPerformanceProps) {
  if (!data.length || !data[0].length) return null
  const max = Math.max(...data.flat())
  const min = Math.min(...data.flat())
  const step = width / (data[0].length - 1)
  // Gradientes
  const gradients = colors.map((color: string, idx: number) => (
    <LinearGradient
      key={`grad-${labels[idx]}`}
      id={`area-gradient-perf-${idx}`}
      x1="0"
      y1="0"
      x2="0"
      y2={height}
    >
      <Stop offset="0%" stopColor={color} stopOpacity="0.18" />
      <Stop offset="100%" stopColor={color} stopOpacity="0.04" />
    </LinearGradient>
  ))
  const areas = data.map((serie: number[], idx: number) => {
    const points = serie.map(
      (v: number, i: number) =>
        [
          i * step,
          height - ((v - min) / (max - min + 1e-6)) * (height - 30),
        ] as [number, number]
    )
    const path = `${getSmoothPath(points)} L${width},${height} L0,${height} Z`
    return (
      <Path
        key={`area-perf-${labels[idx]}`}
        d={path}
        fill={`url(#area-gradient-perf-${idx})`}
        stroke="none"
      />
    )
  })
  const lines = data.map((serie: number[], idx: number) => {
    const points = serie.map(
      (v: number, i: number) =>
        [
          i * step,
          height - ((v - min) / (max - min + 1e-6)) * (height - 30),
        ] as [number, number]
    )
    const path = getSmoothPath(points)
    return (
      <Path
        key={`line-perf-${labels[idx]}`}
        d={path}
        fill="none"
        stroke={colors[idx]}
        strokeWidth={3}
      />
    )
  })
  // Labels dinâmicos
  const isSmall = width < 600
  const dynamicLabels = generateXLabels(data[0].length, isSmall)
  return (
    <View
      style={{
        width: '100%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {legend.map(item => (
          <View
            key={`legend-perf-${item.label}`}
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={width} height={height} style={{ width: '100%' }}>
          <Defs>{gradients}</Defs>
          {/* Áreas preenchidas */}
          {areas}
          {/* Linhas */}
          {lines}
          {/* Linhas de grade */}
          {[...Array(6)].map((_, i) => (
            <Line
              key={`gridline-perf-${i}-${height}`}
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
      </View>
      {/* Eixo X */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 2,
          width: width,
        }}
      >
        {dynamicLabels.map((l, i) => (
          <Text
            key={`xlabel-perf-${l}-${width}`}
            style={{
              color: '#aaa',
              fontSize: 14,
              width: width / dynamicLabels.length,
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

// Mock de dados para performance
const perfData = {
  jogo: [40, 60, 80, 75, 90, 85, 95, 100, 90, 110, 120, 130],
  treino: [50, 55, 60, 62, 65, 70, 75, 80, 85, 90, 95, 100],
}

export default function AthletePerformanceCard() {
  const { width } = useWindowDimensions()
  const isSmall = width < 900
  const containerWidth = width - (isSmall ? 48 : 96)
  const chartWidth = Math.min(containerWidth, 1000)

  return (
    <View
      className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8"
      style={{ padding: isSmall ? 16 : 32 }}
    >
      <Text className="text-yl-400 text-xl font-manropeBold mb-4">
        ÚLTIMAS PERFORMANCES
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AreaChartPerformance
            width={chartWidth}
            height={isSmall ? 140 : 260}
            data={[perfData.jogo, perfData.treino]}
            colors={['#00FF00', '#FFD600']}
            labels={['ÚLTIMO JOGO', 'ÚLTIMO TREINO']}
            xLabels={[]}
            legend={[
              { label: 'ÚLTIMO JOGO', color: '#00FF00' },
              { label: 'ÚLTIMO TREINO', color: '#FFD600' },
            ]}
          />
        </View>
      </View>
    </View>
  )
}
