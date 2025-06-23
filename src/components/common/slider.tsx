import Slider from '@react-native-community/slider'
import React from 'react'
import { Platform, Text, View } from 'react-native'

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
      {Platform.OS === 'web' ? (
        <>
          <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={e => onValueChange(Number(e.target.value))}
            style={{
              width: '100%',
              height: 36,
              appearance: 'none',
              background: 'transparent',
              outline: 'none',
              margin: 0,
              padding: 0,
              borderRadius: 2,
            }}
            data-testid={`slider-${label?.toLowerCase().replace(/\s+/g, '-')}`}
            className="custom-slider"
          />
          <style>
            {`
              .custom-slider::-webkit-slider-runnable-track {
                height: 4px;
                border-radius: 2px;
                background: linear-gradient(
                  to right,
                  #FFD600 0%,
                  #FFD600 ${(100 * (value - min)) / (max - min)}%,
                  #fff ${(100 * (value - min)) / (max - min)}%,
                  #fff 100%
                );
                margin-top: 16px;
              }
              .custom-slider::-webkit-slider-thumb {
                appearance: none;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: #FFD600;
                box-shadow: 0px 1px 2px rgba(0,0,0,0.15);
                border: none;
                margin-top: -12px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }
              .custom-slider:disabled::-webkit-slider-thumb {
                background: #e0e0e0;
              }
              .custom-slider::-webkit-slider-thumb::after {
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #18181b;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
              .custom-slider::-moz-range-track {
                height: 4px;
                border-radius: 2px;
                background: linear-gradient(
                  to right,
                  #FFD600 0%,
                  #FFD600 ${(100 * (value - min)) / (max - min)}%,
                  #fff ${(100 * (value - min)) / (max - min)}%,
                  #fff 100%
                );
              }
              .custom-slider::-ms-fill-lower {
                background: #FFD600;
                border-radius: 2px;
                height: 4px;
              }
              .custom-slider::-ms-fill-upper {
                background: #fff;
                border-radius: 2px;
                height: 4px;
              }
              .custom-slider::-moz-range-thumb {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: #FFD600;
                box-shadow: 0px 1px 2px rgba(0,0,0,0.15);
                border: none;
              }
              .custom-slider:disabled::-moz-range-thumb {
                background: #e0e0e0;
              }
              .custom-slider::-moz-range-thumb::after {
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #18181b;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
              .custom-slider:focus {
                outline: none;
              }
              .custom-slider::-webkit-slider-thumb:focus {
                outline: none;
              }
              .custom-slider::-ms-tooltip {
                display: none;
              }
              .custom-slider {
                width: 100%;
                background: transparent;
              }
            `}
          </style>
        </>
      ) : (
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
      )}
    </View>
  )
}
