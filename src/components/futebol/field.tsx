import { Player } from '@/types/mocks'
import React, { useState } from 'react'
import { Dimensions, Modal, Pressable, Text, View } from 'react-native'
import Svg, { Rect, Circle, Line, Text as SvgText } from 'react-native-svg'
import { PlayerDetailsModal } from './PlayerDetailsModal'

type FieldProps = {
  players: Player[]
  formationTitular: string
  formationReserve: string
  onPlayerPress?: (player: Player) => void
}

const FIELD_MARGIN = 16
const MAX_FIELD_WIDTH = 1000
const MIN_FIELD_WIDTH = 320
const windowWidth = Dimensions.get('window').width
const FIELD_WIDTH = Math.max(
  MIN_FIELD_WIDTH,
  Math.min(windowWidth - FIELD_MARGIN * 2, MAX_FIELD_WIDTH)
)
const FIELD_HEIGHT = FIELD_WIDTH * 0.6 // paisagem
const PLAYER_RADIUS = 22

// Posições fixas para 4-3-3 e 3-4-3, cada time em um lado do campo
const positionMaps = {
  '4-3-3': [
    { x: 0.08, y: 0.5 }, // GK
    { x: 0.2, y: 0.15 }, // LB
    { x: 0.2, y: 0.35 }, // CB
    { x: 0.2, y: 0.65 }, // CB2
    { x: 0.2, y: 0.85 }, // RB
    { x: 0.35, y: 0.25 }, // CM
    { x: 0.35, y: 0.5 }, // CDM
    { x: 0.35, y: 0.75 }, // CM2
    { x: 0.55, y: 0.2 }, // LW
    { x: 0.55, y: 0.5 }, // ST
    { x: 0.55, y: 0.8 }, // RW
  ],
  '3-4-3': [
    { x: 0.92, y: 0.5 }, // GK
    { x: 0.8, y: 0.2 }, // CB
    { x: 0.8, y: 0.4 }, // CB2
    { x: 0.8, y: 0.6 }, // CB3
    { x: 0.8, y: 0.8 }, // LM
    { x: 0.65, y: 0.25 }, // CM
    { x: 0.65, y: 0.5 }, // CM2
    { x: 0.65, y: 0.75 }, // RM
    { x: 0.45, y: 0.2 }, // LW
    { x: 0.45, y: 0.5 }, // ST
    { x: 0.45, y: 0.8 }, // RW
  ],
}

function getPlayerCoords(
  player: Player,
  index: number,
  teamType: 'titular' | 'reserva',
  formationTitular: string,
  formationReserve: string
) {
  // O index é garantido pelo array de jogadores já ordenado por posição
  const formation = teamType === 'titular' ? formationTitular : formationReserve
  const map = positionMaps[formation as keyof typeof positionMaps]
  if (!map || !map[index])
    return { x: 0.5 * FIELD_WIDTH, y: 0.5 * FIELD_HEIGHT }
  return {
    x: map[index].x * FIELD_WIDTH,
    y: map[index].y * FIELD_HEIGHT,
  }
}

export function Field({
  players,
  formationTitular,
  formationReserve,
  onPlayerPress,
}: FieldProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  // Separar titulares e reservas e garantir ordem
  const titulares = players.filter(p => p.teamType === 'titular')
  const reservas = players.filter(p => p.teamType === 'reserva')

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        width: FIELD_WIDTH,
        height: FIELD_HEIGHT,
      }}
    >
      {/* Campo SVG */}
      <Svg
        width={FIELD_WIDTH}
        height={FIELD_HEIGHT}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: '#176a1a',
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#fff',
        }}
      >
        {/* Linhas externas */}
        <Rect
          x={0}
          y={0}
          width={FIELD_WIDTH}
          height={FIELD_HEIGHT}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        {/* Linha do meio */}
        <Line
          x1={FIELD_WIDTH / 2}
          y1={0}
          x2={FIELD_WIDTH / 2}
          y2={FIELD_HEIGHT}
          stroke="#fff"
          strokeWidth={2}
        />
        {/* Círculo central */}
        <Circle
          cx={FIELD_WIDTH / 2}
          cy={FIELD_HEIGHT / 2}
          r={FIELD_HEIGHT * 0.15}
          stroke="#fff"
          strokeWidth={2}
          fill="none"
        />
        {/* Áreas grandes */}
        <Rect
          x={0}
          y={FIELD_HEIGHT * 0.18}
          width={FIELD_WIDTH * 0.14}
          height={FIELD_HEIGHT * 0.64}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        <Rect
          x={FIELD_WIDTH * 0.86}
          y={FIELD_HEIGHT * 0.18}
          width={FIELD_WIDTH * 0.14}
          height={FIELD_HEIGHT * 0.64}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        {/* Pequenas áreas */}
        <Rect
          x={0}
          y={FIELD_HEIGHT * 0.32}
          width={FIELD_WIDTH * 0.06}
          height={FIELD_HEIGHT * 0.36}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        <Rect
          x={FIELD_WIDTH * 0.94}
          y={FIELD_HEIGHT * 0.32}
          width={FIELD_WIDTH * 0.06}
          height={FIELD_HEIGHT * 0.36}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        {/* Marcas do pênalti */}
        <Circle
          cx={FIELD_WIDTH * 0.1}
          cy={FIELD_HEIGHT / 2}
          r={3}
          fill="#fff"
        />
        <Circle
          cx={FIELD_WIDTH * 0.9}
          cy={FIELD_HEIGHT / 2}
          r={3}
          fill="#fff"
        />
        {/* Jogadores titulares */}
        {titulares.map((player, i) => {
          const { x, y } = getPlayerCoords(
            player,
            i,
            'titular',
            formationTitular,
            formationReserve
          )
          return (
            <React.Fragment key={player.id}>
              <Circle
                cx={x}
                cy={y}
                r={PLAYER_RADIUS}
                fill="#ef4444"
                stroke="#000"
                strokeWidth={1}
              />
              <SvgText
                x={x}
                y={y + 7}
                fontSize={18}
                fontWeight="bold"
                fill="#fff"
                textAnchor="middle"
              >
                {player.number}
              </SvgText>
            </React.Fragment>
          )
        })}
        {/* Jogadores reservas */}
        {reservas.map((player, i) => {
          const { x, y } = getPlayerCoords(
            player,
            i,
            'reserva',
            formationTitular,
            formationReserve
          )
          return (
            <React.Fragment key={player.id}>
              <Circle
                cx={x}
                cy={y}
                r={PLAYER_RADIUS}
                fill="#ffe066"
                stroke="#000"
                strokeWidth={1}
              />
              <SvgText
                x={x}
                y={y + 7}
                fontSize={18}
                fontWeight="bold"
                fill="#333"
                textAnchor="middle"
              >
                {player.number}
              </SvgText>
            </React.Fragment>
          )
        })}
      </Svg>
      {/* Pressables sobrepostos para todos os jogadores */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: FIELD_WIDTH,
          height: FIELD_HEIGHT,
        }}
        pointerEvents="box-none"
      >
        {titulares.map((player, i) => {
          const { x, y } = getPlayerCoords(
            player,
            i,
            'titular',
            formationTitular,
            formationReserve
          )
          return (
            <Pressable
              key={player.id}
              style={{
                position: 'absolute',
                left: x - PLAYER_RADIUS,
                top: y - PLAYER_RADIUS,
                width: PLAYER_RADIUS * 2,
                height: PLAYER_RADIUS * 2,
                borderRadius: PLAYER_RADIUS,
                backgroundColor: 'transparent',
              }}
              onPress={() => {
                setSelectedPlayer(player)
                onPlayerPress?.(player)
              }}
              accessibilityLabel={`Ver detalhes de ${player.name}`}
            />
          )
        })}
        {reservas.map((player, i) => {
          const { x, y } = getPlayerCoords(
            player,
            i,
            'reserva',
            formationTitular,
            formationReserve
          )
          return (
            <Pressable
              key={player.id}
              style={{
                position: 'absolute',
                left: x - PLAYER_RADIUS,
                top: y - PLAYER_RADIUS,
                width: PLAYER_RADIUS * 2,
                height: PLAYER_RADIUS * 2,
                borderRadius: PLAYER_RADIUS,
                backgroundColor: 'transparent',
              }}
              onPress={() => {
                setSelectedPlayer(player)
                onPlayerPress?.(player)
              }}
              accessibilityLabel={`Ver detalhes de ${player.name}`}
            />
          )
        })}
      </View>
      {/* Modal de detalhes do jogador */}
      <PlayerDetailsModal
        player={selectedPlayer}
        visible={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onSeeMore={player => {
          console.log('Ver mais', player)
        }}
        fieldWidth={FIELD_WIDTH}
      />
    </View>
  )
}
