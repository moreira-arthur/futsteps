import { Text, View } from 'react-native'

interface Injury {
  name: string
  severity: string
}

interface InjuriesProps {
  injuries: Injury[]
}

export default function Injuries({ injuries }: InjuriesProps) {
  return (
    <View
      style={{
        backgroundColor: '#18181b',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          color: '#FFCC26',
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: 12,
          letterSpacing: 1,
        }}
      >
        INJURED PLAYERS
      </Text>
      <View style={{ gap: 8 }}>
        {injuries.map((injury, i) => (
          <Text key={injury.name} style={{ color: '#fff' }}>
            {injury.name} - {injury.severity}
          </Text>
        ))}
      </View>
    </View>
  )
}
