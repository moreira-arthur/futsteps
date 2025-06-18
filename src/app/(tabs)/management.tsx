import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import AthleteInfoCard from '../../components/athlete/athlete-info-card'
import ScreenContainer from '../../components/common/screen-container'

const TABS = [
  { key: 'physical', label: 'Registrar Dados Físicos' },
  // { key: 'performance', label: 'Registrar Performance' },
  // { key: 'training', label: 'Registrar Treino' },
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
    searchCount: 150, // Contagem de buscas mockada
  },
  {
    id: '2',
    name: 'Gerard Piqué',
    position: 'Zagueiro',
    age: 35,
    number: 3,
    team: { name: 'Barcelona', logo: require('@/assets/clubs/barcelona.png') },
    photo: require('@/assets/players/gerad-pique.png'),
    searchCount: 120,
  },
  {
    id: '3',
    name: 'Memphis Depay',
    position: 'Atacante',
    age: 28,
    number: 9,
    team: { name: 'Barcelona', logo: require('@/assets/clubs/barcelona.png') },
    photo: require('@/assets/players/memphis-dapay.png'),
    searchCount: 90,
  },
]

export default function Management() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('physical')
  const [search, setSearch] = useState('')
  const [selectedAthlete, setSelectedAthlete] = useState<
    (typeof ATHLETES)[0] | null
  >(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showTabs, setShowTabs] = useState(false)
  const { width } = useWindowDimensions()
  const isSmallScreen = width < 768

  // Filtra atletas pelo nome
  const filteredAthletes = ATHLETES.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  // Ordena atletas por contagem de busca e pega os 3 mais buscados
  const mostSearchedAthletes = [...ATHLETES]
    .sort((a, b) => b.searchCount - a.searchCount)
    .slice(0, 3)

  const handleAthleteSelect = (athlete: (typeof ATHLETES)[0]) => {
    setSelectedAthlete(athlete)
    // Navega para a tela de registro físico com o ID do atleta
    router.push({
      pathname: '../(management)/physical-data',
      params: { id: athlete.id },
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAthlete(null)
  }

  return (
    <ScreenContainer>
      {/* Top Tabs */}
      <View className="mt-12 mb-6">
        {isSmallScreen ? (
          <View className="px-4">
            <TouchableOpacity
              onPress={() => setShowTabs(!showTabs)}
              className="flex-row items-center justify-between bg-zinc-800 px-4 py-3 rounded-lg "
            >
              <Text className="text-zinc-100 text-base font-manropeBold">
                {TABS.find(tab => tab.key === activeTab)?.label}
              </Text>
              <Feather
                name={showTabs ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>

            {showTabs && (
              <View className="mt-2 bg-zinc-800  rounded-lg overflow-hidden">
                {TABS.map(tab => (
                  <TouchableOpacity
                    key={tab.key}
                    onPress={() => {
                      setActiveTab(tab.key)
                      setShowTabs(false)
                    }}
                    className={`px-4 py-3 border-b border-zinc-700 ${
                      activeTab === tab.key ? 'bg-zinc-700' : ''
                    }`}
                  >
                    <Text
                      className={`text-base font-manropeBold ${
                        activeTab === tab.key ? 'text-yl-400' : 'text-zinc-100'
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View className="flex-row justify-center items-center gap-4">
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`px-6 py-2 rounded-full ${
                  activeTab === tab.key ? 'bg-yl-400' : 'bg-zinc-800'
                }`}
              >
                <Text
                  className={`text-base font-manropeBold ${
                    activeTab === tab.key ? 'text-zinc-900' : 'text-zinc-100'
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Tab Content */}
      <View className="flex-1 ">
        {activeTab === 'physical' && (
          <ScrollView
            className="flex-1 mx-4 "
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}
          >
            {/* Campo de busca */}
            <View className="w-full items-center mb-4">
              <View className="w-full max-w-6xl flex-row items-center bg-zinc-800 rounded-lg px-2 h-10">
                <Feather
                  name="search"
                  size={22}
                  color="#aaa"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  className="flex-1 text-zinc-100 py-2 text-base font-manropeRegular w-full max-h-9"
                  placeholder="Buscar atleta pelo nome..."
                  placeholderTextColor="#aaa"
                  value={search}
                  onChangeText={setSearch}
                  style={{ backgroundColor: 'transparent' }}
                />
              </View>
            </View>

            {/* Cards dos atletas */}
            <View className="w-full items-center">
              <View className="w-full px-4 flex flex-col items-center">
                <Text className="text-zinc-100 text-lg font-manropeBold mb-4">
                  {search.length > 0
                    ? 'Resultados da busca'
                    : 'Atletas mais buscados'}
                </Text>
                {(search.length > 0
                  ? filteredAthletes
                  : mostSearchedAthletes
                ).map(athlete => (
                  <TouchableOpacity
                    key={athlete.id}
                    onPress={() => handleAthleteSelect(athlete)}
                    className="mb-4 w-full max-w-6xl"
                  >
                    <AthleteInfoCard athlete={athlete} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
        {activeTab === 'performance' && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-100 text-xl font-manropeBold">
              Registrar Performance
            </Text>
          </View>
        )}
        {activeTab === 'training' && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-zinc-100 text-xl font-manropeBold">
              Registrar Treino
            </Text>
          </View>
        )}
      </View>

      {/* Modal de confirmação */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <Pressable
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={handleCloseModal}
        >
          <View
            style={{
              backgroundColor: '#18181b',
              padding: 24,
              borderRadius: 12,
              width: '80%',
              maxWidth: 400,
            }}
          >
            <Text className="text-zinc-100 text-lg font-manropeBold mb-4 text-center">
              {modalMessage}
            </Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              className="bg-yl-400 py-3 rounded-lg"
            >
              <Text className="text-zinc-900 text-center font-manropeBold">
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </ScreenContainer>
  )
}
