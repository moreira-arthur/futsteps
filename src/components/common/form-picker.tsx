import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Text, View } from 'react-native'

interface FormPickerProps<T extends string> {
  label?: string
  value: T
  onValueChange: (value: T) => void
  items: T[]
  placeholder?: string
  disabled?: boolean
}

export default function FormPicker<T extends string>({
  label,
  value,
  onValueChange,
  items,
  placeholder,
  disabled = false,
}: FormPickerProps<T>) {
  return (
    <View className="mb-4">
      {label && <Text className="text-zinc-100 text-sm mb-2">{label}</Text>}
      <View className="bg-zinc-800 rounded-lg overflow-hidden">
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ color: '#fff' }}
          enabled={!disabled}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" color="#aaa" />
          )}
          {items.map(item => (
            <Picker.Item key={item} label={item} value={item} color="#fff" />
          ))}
        </Picker>
      </View>
    </View>
  )
}
