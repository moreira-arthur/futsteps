import { Ionicons } from '@expo/vector-icons'
import React, { useState, useRef, useEffect } from 'react'
import {
  Platform,
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

export type ValidationRule = {
  validate: (value: string) => boolean
  message: string
}

export type FormInputProps = TextInputProps & {
  label?: string
  error?: string
  validationRules?: ValidationRule[]
  onValidationChange?: (isValid: boolean) => void
  secureTextEntry?: boolean
  type?: 'text' | 'email' | 'password' | 'number' | 'decimal'
  required?: boolean
  accessibilityHint?: string
  editable?: boolean
  testID?: string
}

export default function FormInput({
  label,
  error,
  validationRules = [],
  onValidationChange,
  secureTextEntry,
  type = 'text',
  value = '',
  onChangeText,
  required = false,
  accessibilityHint,
  editable = true,
  testID,
  ...props
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const inputRef = useRef<TextInput>(null)
  const [localValue, setLocalValue] = useState(value)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const getAccessibilityHint = () => {
    let hint = typeof accessibilityHint === 'string' ? accessibilityHint : ''

    if (type === 'number' || type === 'decimal') {
      hint += hint ? '. numeric input' : 'numeric input'
    }

    if (type === 'password') {
      hint += hint ? '. password input' : 'password input'
    }

    if (typeof error === 'string' && error && (!localValue || !isValid)) {
      hint += hint ? `. ${error}` : error
    }

    if (!editable) {
      hint += hint ? '. disabled' : 'disabled'
    }

    return hint
  }

  const getAccessibilityLabel = () => {
    let label = props.placeholder || ''
    if (required) label += ' (required)'
    if (type === 'password') label += ' (password)'
    if (type === 'email') label += ' (email)'
    return label
  }

  const validateInput = (text: string) => {
    if (required && !text) {
      setIsValid(false)
      onValidationChange?.(false)
      return
    }

    if (!text) {
      setIsValid(true)
      onValidationChange?.(true)
      return
    }

    const isValid = validationRules.every(rule => rule.validate(text))
    setIsValid(isValid)
    onValidationChange?.(isValid)
  }

  const handleChangeText = (text: string) => {
    setHasInteracted(true)
    let sanitizedText = text

    switch (type) {
      case 'number':
        sanitizedText = text.replace(/[^0-9]/g, '')
        break
      case 'decimal': {
        sanitizedText = text.replace(',', '.').replace(/[^0-9.]/g, '')
        const parts = sanitizedText.split('.')
        if (parts.length > 2) {
          sanitizedText = `${parts[0]}.${parts.slice(1).join('')}`
        }
        break
      }
      case 'email':
        sanitizedText = text.toLowerCase()
        break
    }

    setLocalValue(sanitizedText)
    onChangeText?.(sanitizedText)
    validateInput(sanitizedText)
  }

  const getBorderColor = () => {
    if (error || (hasInteracted && !isValid)) return 'border-red-500'
    if (isValid && localValue) return 'border-green-500'
    return 'border-zinc-700'
  }

  const isPasswordType = type === 'password' || secureTextEntry

  return (
    <View className="w-full mb-4">
      {typeof label === 'string' && label.length > 0 && (
        <Text className="text-zinc-100 text-sm font-manropeBold mb-2">
          {label}
        </Text>
      )}

      <View className="relative">
        <TextInput
          ref={inputRef}
          className={`w-full px-4 py-3 rounded-lg border ${getBorderColor()} ${
            !editable ? 'bg-zinc-800' : 'bg-zinc-900'
          } text-zinc-100`}
          placeholder={props.placeholder}
          placeholderTextColor="#aaa"
          value={localValue}
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordType && !isPasswordVisible}
          editable={editable}
          keyboardType={
            type === 'number' || type === 'decimal' ? 'numeric' : 'default'
          }
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          testID={testID || 'form-input'}
          accessibilityLabel={getAccessibilityLabel()}
          accessibilityHint={getAccessibilityHint()}
          accessibilityRole="text"
          accessibilityState={{
            disabled: !editable,
          }}
        />

        {isPasswordType && (
          <TouchableOpacity
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            testID="password-toggle"
            accessibilityLabel={
              isPasswordVisible ? 'Hide password' : 'Show password'
            }
            accessibilityRole="button"
            accessibilityState={{ disabled: !editable }}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        )}
      </View>

      {typeof error === 'string' && error.length > 0 && (
        <Text className="text-red-500 text-sm font-manropeRegular mt-1">
          {error}
        </Text>
      )}
    </View>
  )
}
