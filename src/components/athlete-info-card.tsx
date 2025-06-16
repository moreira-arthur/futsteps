import React from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import type { ImageSourcePropType } from 'react-native'

interface AthleteInfoCardProps {
  athlete: {
    team: { name: string; logo: ImageSourcePropType }
    name: string
    position: string
    age: number
    number: number
    photo: ImageSourcePropType
  }
}

export default function AthleteInfoCard({ athlete }: AthleteInfoCardProps) {
  const { width } = useWindowDimensions()
  const isSmall = width < 700

  return (
    <View
      className="bg-zinc-900 rounded-2xl w-full max-w-6xl mb-6"
      style={{
        minHeight: 220,
        padding: isSmall ? 16 : 32,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
        justifyContent: 'space-between',
      }}
    >
      {/* Info à esquerda */}
      <View
        style={{
          flex: 1,
          gap: isSmall ? 10 : 16,
          minWidth: isSmall ? '100%' : 350,
          maxWidth: isSmall ? '100%' : 350,
        }}
      >
        {/* Time */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: isSmall ? 4 : 12,
          }}
        >
          <Image
            source={athlete.team.logo}
            style={{ width: 50, height: 40, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text className="text-white text-lg font-bold">
            {athlete.team.name}
          </Text>
        </View>
        {/* Nome */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: isSmall ? 2 : 8,
          }}
        >
          <Text
            className="text-white text-lg font-medium font-poppinsMedium"
            style={{ width: 100 }}
          >
            NOME :
          </Text>
          <View
            className="bg-white rounded-lg justify-center"
            style={{ minHeight: 40, minWidth: 180, paddingHorizontal: 16 }}
          >
            <Text className="text-black text-lg font-normal">
              {athlete.name}
            </Text>
          </View>
        </View>
        {/* Posição */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: isSmall ? 2 : 8,
          }}
        >
          <Text
            className="text-white text-lg font-poppinsMedium"
            style={{ width: 100 }}
          >
            POSIÇÃO :
          </Text>
          <View
            className="bg-white rounded-lg justify-center"
            style={{ minHeight: 40, minWidth: 180, paddingHorizontal: 16 }}
          >
            <Text className="text-black text-lg font-normal">
              {athlete.position}
            </Text>
          </View>
        </View>
        {/* Idade */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            className="text-white text-lg  font-poppinsMedium"
            style={{ width: 100 }}
          >
            IDADE :
          </Text>
          <View
            className="bg-white rounded-lg justify-center"
            style={{ minHeight: 40, minWidth: 180, paddingHorizontal: 16 }}
          >
            <Text className="text-black text-lg font-normal">
              {athlete.age} Anos
            </Text>
          </View>
        </View>
      </View>
      {/* Foto e número no bottom */}
      {isSmall ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 24,
            position: 'relative',
            minHeight: 120,
          }}
        >
          <Text
            style={{
              color: '#FFC107',
              fontSize: 32,
              fontWeight: 'bold',
              marginRight: 12,
              marginBottom: 8,
            }}
          >
            #{athlete.number}
          </Text>
          <Image
            source={athlete.photo}
            style={{ marginBottom: 0, height: 200 }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            position: 'relative',
            minHeight: 120,
          }}
        >
          <Text
            style={{
              color: '#FFC107',
              fontSize: 36,
              fontWeight: 'bold',
              marginRight: 16,
              marginBottom: 0,
            }}
          >
            #{athlete.number}
          </Text>
          <Image
            source={athlete.photo}
            style={{ marginBottom: 0 }}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  )
}
