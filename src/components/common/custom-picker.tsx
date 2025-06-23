import React, { useState } from 'react'
import { FlatList, Modal, Pressable, Text, View } from 'react-native'

interface CustomPickerProps<T = string> {
  label: string
  value: T
  onValueChange: (value: T) => void
  options: { label: string; value: T }[]
  placeholder: string
}

export default function CustomPicker<T = string>({
  label,
  value,
  onValueChange,
  options,
  placeholder,
}: CustomPickerProps<T>) {
  const [modalVisible, setModalVisible] = useState(false)
  const selectedLabel =
    options.find(opt => opt.value === value)?.label ||
    placeholder ||
    'Selecione'

  return (
    <View className="mb-4">
      {label && <Text className="text-zinc-100 text-sm mb-2">{label}</Text>}
      <Pressable
        className="bg-zinc-900 rounded-lg px-4 py-3 flex-row items-center justify-between border border-zinc-700"
        onPress={() => setModalVisible(true)}
      >
        <Text
          className={`text-base ${value ? 'text-zinc-100' : 'text-zinc-400'}`}
        >
          {selectedLabel}
        </Text>
        <Text className="text-zinc-400 ml-2">▼</Text>
      </Pressable>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center items-center"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-zinc-800 rounded-lg w-4/5 max-w-xl p-2">
            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              renderItem={({ item }) => (
                <Pressable
                  className={`px-4 py-4 ${item.value === value ? 'bg-zinc-900' : ''}`}
                  onPress={() => {
                    onValueChange(item.value)
                    setModalVisible(false)
                  }}
                >
                  <Text
                    className={`text-base ${item.value === value ? 'text-yl-400 font-bold' : 'text-zinc-100'}`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => (
                <View className="h-px bg-zinc-700" />
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
