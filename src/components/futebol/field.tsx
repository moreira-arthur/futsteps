import type { Player } from '@/mocks/mock-training'
import React, { useState } from 'react'
import { Modal, Pressable, Text, View, useWindowDimensions } from 'react-native'
import Svg, { Rect, Circle, Line, Text as SvgText } from 'react-native-svg'
import { PlayerDetailsModal } from './PlayerDetailsModal'

type FieldProps = {
  players: Player[]
  formationTitular: string
  formationReserve: string
  onPlayerPress?: (player: Player) => void
  onPlayerSeeMore?: (player: Player) => void
}

// Novo type para o dicionário de posições
interface PositionMap {
  [key: string]: { x: number; y: number }
}

const positionMaps: { [formation: string]: PositionMap } = {
  '4-3-3': {
    GK: { x: 0.08, y: 0.5 },
    LB: { x: 0.2, y: 0.15 },
    CB: { x: 0.2, y: 0.35 },
    CB2: { x: 0.2, y: 0.65 },
    RB: { x: 0.2, y: 0.85 },
    CDM: { x: 0.35, y: 0.5 },
    CM: { x: 0.35, y: 0.25 },
    CM2: { x: 0.35, y: 0.75 },
    LW: { x: 0.55, y: 0.2 },
    ST: { x: 0.55, y: 0.5 },
    RW: { x: 0.55, y: 0.8 },
  },
  '3-4-3': {
    GK: { x: 0.92, y: 0.5 },
    CB: { x: 0.8, y: 0.25 },
    CB2: { x: 0.8, y: 0.5 },
    CB3: { x: 0.8, y: 0.75 },
    LM: { x: 0.65, y: 0.2 },
    CM: { x: 0.65, y: 0.4 },
    CM2: { x: 0.65, y: 0.6 },
    RM: { x: 0.65, y: 0.8 },
    LW: { x: 0.45, y: 0.2 },
    ST: { x: 0.45, y: 0.5 },
    RW: { x: 0.45, y: 0.8 },
  },
}

function getPlayerCoords(
  player: Player,
  teamType: 'titular' | 'reserva',
  formationTitular: string,
  formationReserve: string,
  FIELD_WIDTH: number,
  FIELD_HEIGHT: number
) {
  const formation = teamType === 'titular' ? formationTitular : formationReserve
  const map = positionMaps[formation as keyof typeof positionMaps]
  if (!map || !map[player.position])
    return { x: 0.5 * FIELD_WIDTH, y: 0.5 * FIELD_HEIGHT }
  return {
    x: map[player.position].x * FIELD_WIDTH,
    y: map[player.position].y * FIELD_HEIGHT,
  }
}

export function Field({
  players,
  formationTitular,
  formationReserve,
  onPlayerPress,
  onPlayerSeeMore,
}: FieldProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const { width: windowWidth } = useWindowDimensions()
  const FIELD_MARGIN = 16
  const MAX_FIELD_WIDTH = 1000
  const MIN_FIELD_WIDTH = 320
  const FIELD_WIDTH = Math.max(
    MIN_FIELD_WIDTH,
    Math.min(windowWidth - FIELD_MARGIN * 2, MAX_FIELD_WIDTH)
  )
  const FIELD_HEIGHT = FIELD_WIDTH * 0.6 // paisagem
  const PLAYER_RADIUS = windowWidth >= 900 ? 30 : 16

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
          rx={10}
          ry={10}
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
            'titular',
            formationTitular,
            formationReserve,
            FIELD_WIDTH,
            FIELD_HEIGHT
          )
          return (
            <React.Fragment key={player.id}>
              <Circle
                cx={x}
                cy={y}
                r={PLAYER_RADIUS}
                fill={player.teamType === 'titular' ? '#ef4444' : '#FFCC26'}
                stroke="#000"
                strokeWidth={1}
              />
              <SvgText
                x={x}
                y={y + 7}
                fontSize={18}
                fontWeight="bold"
                fill={player.teamType === 'titular' ? '#fff' : '#000'}
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
            'reserva',
            formationTitular,
            formationReserve,
            FIELD_WIDTH,
            FIELD_HEIGHT
          )
          return (
            <React.Fragment key={player.id}>
              <Circle
                cx={x}
                cy={y}
                r={PLAYER_RADIUS}
                fill={player.teamType === 'titular' ? '#ef4444' : '#FFCC26'}
                stroke="#000"
                strokeWidth={1}
              />
              <SvgText
                x={x}
                y={y + 7}
                fontSize={18}
                fontWeight="bold"
                fill={player.teamType === 'titular' ? '#fff' : '#000'}
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
          pointerEvents: 'box-none',
        }}
      >
        {titulares.map((player, i) => {
          const { x, y } = getPlayerCoords(
            player,
            'titular',
            formationTitular,
            formationReserve,
            FIELD_WIDTH,
            FIELD_HEIGHT
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
            'reserva',
            formationTitular,
            formationReserve,
            FIELD_WIDTH,
            FIELD_HEIGHT
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
          if (
            player.name === 'Frankie de Jong' ||
            player.name === 'Gerard Piqué' ||
            player.name === 'Memphis Depay'
          ) {
            onPlayerSeeMore?.(player)
            setSelectedPlayer(null)
          }
        }}
        fieldWidth={FIELD_WIDTH}
      />
    </View>
  )
}
