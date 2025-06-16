import { Player } from '@/types/mocks'
import React from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'

type PlayerDetailsModalProps = {
  player: Player | null
  visible: boolean
  onClose: () => void
  onSeeMore: (player: Player) => void
  fieldWidth: number
}

export function PlayerDetailsModal({
  player,
  visible,
  onClose,
  onSeeMore,
  fieldWidth,
}: PlayerDetailsModalProps) {
  if (!player) return null
  const modalWidth = Math.max(260, Math.min(fieldWidth * 0.8, 400))

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: '#222',
            padding: 24,
            borderRadius: 12,
            minWidth: 200,
            width: modalWidth,
          }}
        >
          <Svg
            height={60}
            width={60}
            style={{ alignSelf: 'center', marginBottom: 8 }}
          >
            <Circle
              cx={30}
              cy={30}
              r={28}
              fill={player.teamType === 'titular' ? '#ef4444' : '#ffe066'}
              stroke="#000"
              strokeWidth={2}
            />
            <SvgText
              x={30}
              y={38}
              fontSize={24}
              fontWeight="bold"
              fill="#fff"
              textAnchor="middle"
            >
              {player.number}
            </SvgText>
          </Svg>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 8,
              }}
            >
              {player.name}
            </Text>
            <Text style={{ color: '#ccc', marginBottom: 2 }}>
              Número: {player.number}
            </Text>
            <Text style={{ color: '#ccc', marginBottom: 2 }}>
              Idade: {player.age}
            </Text>
            <Text style={{ color: '#ccc', marginBottom: 2 }}>
              Posição: {player.position}
            </Text>
            <Text style={{ color: '#ccc', marginBottom: 16 }}>
              Time: {player.teamType === 'titular' ? 'Titular' : 'Reserva'}
            </Text>
            <Pressable
              style={{
                backgroundColor: '#3b82f6',
                borderRadius: 8,
                paddingHorizontal: 24,
                paddingVertical: 10,
                marginTop: 8,
              }}
              onPress={() => onSeeMore(player)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Ver mais
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}
