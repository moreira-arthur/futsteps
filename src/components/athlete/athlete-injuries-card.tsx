import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'

const injuries = [
  {
    injury: 'Distensão muscular',
    recovery: '2 semanas',
    date: '10/05/2024',
    percent: 100,
  },
  {
    injury: 'Entorse no tornozelo',
    recovery: '3 semanas',
    date: '20/03/2024',
    percent: 80,
  },
  {
    injury: 'Lesão no joelho',
    recovery: '1 mês',
    date: '15/01/2024',
    percent: 60,
  },
]

function ProgressBar({
  value,
  max = 100,
  color = '#39FF14',
  style = {},
}: {
  value: number
  max?: number
  color?: string
  style?: StyleProp<ViewStyle>
}) {
  return (
    <View
      style={[
        {
          height: 8,
          backgroundColor: '#444',
          borderRadius: 4,
          width: '100%',
          marginTop: 6,
          marginBottom: 6,
        },
        style,
      ]}
    >
      <View
        style={{
          height: 8,
          width: `${Math.max(0, Math.min(1, value / max)) * 100}%`,
          backgroundColor: color,
          borderRadius: 4,
        }}
      />
    </View>
  )
}

export default function AthleteInjuriesCard() {
  const { width } = useWindowDimensions()
  const isSmall = width < 700
  return (
    <View
      className="bg-zinc-800 rounded-[18px] w-full max-w-6xl mb-8"
      style={{ padding: isSmall ? 16 : 32 }}
    >
      <Text className="text-yl-400 text-xl font-manropeBold mb-4">
        ÚLTIMAS LESÕES
      </Text>
      {isSmall ? (
        // MOBILE: cartões verticais
        <View style={{ gap: 16 }}>
          {injuries.map(item => (
            <View
              key={item.injury + item.date}
              className="bg-zinc-900"
              style={{
                borderRadius: 12,
                padding: 16,
                gap: 8,
                boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 2,
                }}
              >
                {item.injury}
              </Text>
              <Text style={{ color: '#aaa', fontSize: 15 }}>
                Recuperação:{' '}
                <Text style={{ color: '#fff' }}>{item.recovery}</Text>
              </Text>
              <Text style={{ color: '#aaa', fontSize: 15 }}>
                Data: <Text style={{ color: '#fff' }}>{item.date}</Text>
              </Text>
              <Text style={{ color: '#aaa', fontSize: 15 }}>Recuperação:</Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <ProgressBar
                  value={item.percent}
                  max={100}
                  style={{ maxWidth: '85%' }}
                />
                <Text
                  style={{
                    color: '#39FF14',
                    fontWeight: 'bold',
                    fontSize: 15,
                    minWidth: 32,
                    textAlign: 'right',
                  }}
                >
                  {item.percent}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        // DESKTOP: tabela tradicional
        <>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#333',
              paddingBottom: 6,
            }}
          >
            <Text
              style={{
                flex: 1.2,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              LESÃO
            </Text>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              TEMPO DE RECUPERAÇÃO
            </Text>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              DATA
            </Text>
            <Text
              style={{
                flex: 1,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              RECUPERAÇÃO
            </Text>
          </View>
          {injuries.map(item => (
            <View
              key={item.injury + item.date}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth:
                  item === injuries[injuries.length - 1] ? 0 : 1,
                borderBottomColor: '#222',
              }}
            >
              <Text style={{ flex: 1.2, color: '#fff', fontSize: 15 }}>
                {item.injury}
              </Text>
              <Text style={{ flex: 1, color: '#fff', fontSize: 15 }}>
                {item.recovery}
              </Text>
              <Text style={{ flex: 1, color: '#fff', fontSize: 15 }}>
                {item.date}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                <ProgressBar
                  value={item.percent}
                  max={100}
                  style={{ maxWidth: '75%' }}
                />
                <Text
                  style={{
                    color: '#39FF14',
                    fontWeight: 'bold',
                    fontSize: 15,
                    minWidth: 32,
                    textAlign: 'right',
                  }}
                >
                  {item.percent}%
                </Text>
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  )
}
