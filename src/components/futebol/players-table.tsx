import { Text, View } from 'react-native'

export default function PlayersTable() {
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
        PLAYERS
      </Text>
      {/* Placeholder para tabela de jogadores */}
      <View style={{ gap: 8 }}>
        <Text style={{ color: '#fff' }}>Dianne Russell - Striker - 67%</Text>
        <Text style={{ color: '#fff' }}>Floyd Miles - Left Back - 69%</Text>
        <Text style={{ color: '#fff' }}>Jane Cooper - Right Back - 78%</Text>
        <Text style={{ color: '#fff' }}>Arlene McCoy - Left Wing - 77%</Text>
        <Text style={{ color: '#fff' }}>
          Esther Howard - Attacking Mid - 100%
        </Text>
        <Text style={{ color: '#fff' }}>Devon Lane - Center Back - 44%</Text>
        <Text style={{ color: '#fff' }}>Guy Hawkins - Goalkeeper - 100%</Text>
      </View>
    </View>
  )
}
