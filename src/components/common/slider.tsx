import Slider from '@react-native-community/slider'
import React from 'react'
import { Text, View } from 'react-native'

interface SliderProps {
  value: number
  onValueChange: (value: number) => void
  label?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export default function CustomSlider({
  value,
  onValueChange,
  label,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderProps) {
  return (
    <View className="mb-4">
      {label && (
        <View className="flex-row justify-between mb-1">
          <Text className="text-zinc-100 text-sm">{label}</Text>
          <Text className="text-yl-400 text-sm font-bold">{value}%</Text>
        </View>
      )}
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        disabled={disabled}
        minimumTrackTintColor="#FFD600"
        maximumTrackTintColor="#bdbdbd"
        thumbTintColor="#FFD600"
        style={{ width: '100%', height: 36 }}
        trackStyle={{ height: 4, borderRadius: 2 }}
        renderThumbComponent={() => (
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: '#FFD600',
              borderWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.15)',
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#18181b',
              }}
            />
          </View>
        )}
        testID={`slider-${label?.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </View>
  )
}
