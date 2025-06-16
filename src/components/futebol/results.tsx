import { Text, View } from 'react-native'

interface Result {
  home: string
  away: string
  date: string
  homeLogo: string | null
  awayLogo: string | null
}

interface ResultsProps {
  results: Result[]
}

export default function Results({ results }: ResultsProps) {
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
        LATEST RESULTS
      </Text>
      <View style={{ gap: 8 }}>
        {results.map((r, i) => (
          <Text key={i} style={{ color: '#fff' }}>
            {r.home} vs {r.away} - {r.date}
          </Text>
        ))}
      </View>
    </View>
  )
}
