import AthleteGeneralDataCard from '@/components/athlete-general-data-card'
import AthleteInfoCard from '@/components/athlete-info-card'
import AthleteInjuriesCard from '@/components/athlete-injuries-card'
import AthleteLastTrainingStatsCard from '@/components/athlete-last-training-stats-card'
import AthletePerformanceCard from '@/components/athlete-performance-card'
import ClubBestPlayers from '@/components/club-best-players'
import ClubGeneralDataCard from '@/components/club-general-data-card'
import ClubInfoCard from '@/components/club-info-card'
import ClubLastResults from '@/components/club-last-results'
import ClubPerformanceAreaChart from '@/components/club-performance-area-chart'
import ClubSeasonStats from '@/components/club-season-stats'
import ScreenContainer from '@/components/screen-container'
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const TABS = [
  { key: 'athlete', label: 'Atleta' },
  { key: 'club', label: 'Clube' },
  // { key: 'training', label: 'Treino' },
]

// Mock de atletas
const ATHLETES = [
  {
    id: '1',
    name: 'Frankie de Jong',
    position: 'Meia',
    age: 27,
    number: 45,
    team: { name: 'Barcelona', logo: require('@/assets/clubs/barcelona.png') },
    photo: require('@/assets/players/frakie-de-jong.png'),
  },
  {
    id: '2',
    name: 'Gerard Piqué',
    position: 'Zagueiro',
    age: 35,
    number: 3,
    team: { name: 'Barcelona', logo: require('@/assets/clubs/barcelona.png') },
    photo: require('@/assets/players/gerad-pique.png'),
  },
  {
    id: '3',
    name: 'Memphis Depay',
    position: 'Atacante',
    age: 28,
    number: 9,
    team: { name: 'Barcelona', logo: require('@/assets/clubs/barcelona.png') },
    photo: require('@/assets/players/memphis-dapay.png'),
  },
]

// Mock para seleção de atributos do radar/área
const CLUB_ATTRIBUTES = [
  'velocidade',
  'chutes',
  'passe',
  'defesa',
  'rendimento',
]

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('athlete')
  const [search, setSearch] = useState('')
  const [selectedAthlete, setSelectedAthlete] = useState(ATHLETES[0])
  const [selectedClubAttrs, setSelectedClubAttrs] = useState<string[]>([
    'velocidade',
    'chutes',
  ])

  // Filtra atletas pelo nome
  const filteredAthletes = ATHLETES.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ScreenContainer>
      {/* Top Tabs */}
      <View className="flex-row justify-center items-center mt-12 mb-6 gap-4">
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-full ${activeTab === tab.key ? 'bg-yl-400' : 'bg-zinc-800'}`}
          >
            <Text
              className={`text-base font-manropeBold ${activeTab === tab.key ? 'text-zinc-900' : 'text-zinc-100'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View className="flex-1">
        {activeTab === 'athlete' && (
          <ScrollView
            className="flex-1 w-full"
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}
          >
            {/* Campo de busca */}
            <View className="w-full max-w-xl mb-4 flex-row items-center bg-zinc-800 rounded-lg px-2 h-10">
              <Feather
                name="search"
                size={22}
                color="#aaa"
                style={{ marginRight: 8 }}
              />
              <TextInput
                className="flex-1  text-zinc-100 py-2 text-base font-manropeRegular w-full max-h-9"
                placeholder="Buscar atleta pelo nome..."
                placeholderTextColor="#aaa"
                value={search}
                onChangeText={setSearch}
                style={{ backgroundColor: 'transparent' }}
              />
            </View>
            {/* Lista de sugestões */}
            {search.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  width: '100%',
                  maxWidth: 480,
                  backgroundColor: '#18181b',
                  borderRadius: 12,
                  marginTop: 4,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 4,
                  maxHeight: 220,
                  overflow: 'hidden',
                  alignSelf: 'center',
                }}
              >
                <View style={{ maxHeight: 220 }}>
                  {filteredAthletes.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 18,
                        borderBottomWidth: 1,
                        borderBottomColor: '#27272a',
                        backgroundColor: '#18181b',
                      }}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectedAthlete(item)
                        setSearch('')
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 16 }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            {/* Card do atleta selecionado */}
            <AthleteInfoCard athlete={selectedAthlete} />
            <AthleteGeneralDataCard />
            <AthletePerformanceCard />
            <AthleteLastTrainingStatsCard />
            <AthleteInjuriesCard />
          </ScrollView>
        )}
        {activeTab === 'club' && (
          <ScrollView
            className="flex-1 w-full"
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}
          >
            <ClubInfoCard />
            <ClubGeneralDataCard
              selected={selectedClubAttrs}
              setSelected={setSelectedClubAttrs}
            />
            <ClubPerformanceAreaChart />
            <ClubLastResults />
            <ClubBestPlayers />
            <ClubSeasonStats />
          </ScrollView>
        )}
        {activeTab === 'training' && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-100 text-xl font-manropeBold">
              Estatísticas de Treino
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  )
}
