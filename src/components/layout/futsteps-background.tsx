import { View } from 'react-native'
import Svg, { Line, Circle, Rect, Path, Ellipse } from 'react-native-svg'

export function FutstepsBackground({ width }: { width: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Linhas diagonais amarelas */}
      <Svg
        height="100%"
        width="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Line
          x1="0"
          y1="0"
          x2={width}
          y2={width * 0.25}
          stroke="#FFCC26"
          strokeWidth="8"
          opacity="0.18"
        />
        <Line
          x1="0"
          y1={width * 0.5}
          x2={width}
          y2={width * 0.75}
          stroke="#FFCC26"
          strokeWidth="6"
          opacity="0.12"
        />
      </Svg>
      {/* Bola estilizada */}
      <Svg
        height="120"
        width="120"
        style={{ position: 'absolute', bottom: 40, right: 24 }}
      >
        <Circle cx="60" cy="60" r="50" fill="#FFCC26" opacity="0.08" />
        <Circle
          cx="60"
          cy="60"
          r="36"
          fill="none"
          stroke="#FFCC26"
          strokeWidth="4"
          opacity="0.18"
        />
        {/* Detalhe de pentágono */}
        <Path
          d="M60 40 L75 55 L70 75 L50 75 L45 55 Z"
          fill="#FFCC26"
          opacity="0.18"
        />
      </Svg>
      {/* Marcações de campo */}
      <Svg
        height="80"
        width="180"
        style={{ position: 'absolute', top: 80, left: 16 }}
      >
        <Rect
          x="10"
          y="10"
          width="160"
          height="60"
          rx="20"
          fill="none"
          stroke="#FFCC26"
          strokeWidth="3"
          opacity="0.10"
        />
        <Path d="M90 10 V70" stroke="#FFCC26" strokeWidth="2" opacity="0.10" />
      </Svg>
      {/* Trave */}
      <Svg
        height="40"
        width="100"
        style={{ position: 'absolute', top: 180, right: 32 }}
      >
        <Rect
          x="10"
          y="10"
          width="80"
          height="20"
          rx="4"
          fill="none"
          stroke="#FFCC26"
          strokeWidth="3"
          opacity="0.13"
        />
      </Svg>
      {/* Cone */}
      <Svg
        height="40"
        width="40"
        style={{ position: 'absolute', bottom: 120, left: 32 }}
      >
        <Ellipse cx="20" cy="30" rx="16" ry="8" fill="#FFCC26" opacity="0.10" />
        <Path d="M8 30 L20 5 L32 30 Z" fill="#FFCC26" opacity="0.18" />
      </Svg>
      {/* Chuteira estilizada (simples) */}
      <Svg
        height="40"
        width="60"
        style={{ position: 'absolute', bottom: 60, left: 80 }}
      >
        <Path
          d="M10 30 Q30 10 50 20 Q55 25 50 30 Z"
          fill="#FFCC26"
          opacity="0.10"
        />
        <Circle cx="15" cy="32" r="2" fill="#FFCC26" opacity="0.18" />
        <Circle cx="25" cy="32" r="2" fill="#FFCC26" opacity="0.18" />
        <Circle cx="35" cy="32" r="2" fill="#FFCC26" opacity="0.18" />
      </Svg>
    </View>
  )
}
