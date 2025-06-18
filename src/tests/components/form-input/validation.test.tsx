import FormInput from '@/components/common/form-input'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput Validation', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Number Input Validation', () => {
    it('accepts valid numeric input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="number"
          placeholder="Number input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Number input')

      fireEvent.changeText(input, '123')
      expect(mockOnChangeText).toHaveBeenCalledWith('123')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })

    it('rejects non-numeric input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="number"
          placeholder="Number input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Number input')

      fireEvent.changeText(input, 'abc')
      expect(mockOnChangeText).toHaveBeenCalledWith('')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Decimal Input Validation', () => {
    it('accepts valid decimal input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      fireEvent.changeText(input, '123.45')
      expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })

    it('converts comma to decimal point', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      fireEvent.changeText(input, '123,45')
      expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })

    it('normalizes multiple decimal points to single point', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      fireEvent.changeText(input, '123.45.67')
      expect(mockOnChangeText).toHaveBeenCalledWith('123.4567')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })

    it('rejects non-numeric input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      fireEvent.changeText(input, 'abc')
      expect(mockOnChangeText).toHaveBeenCalledWith('')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Email Input Validation', () => {
    it('accepts valid email input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="email"
          placeholder="Email input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Email input')

      fireEvent.changeText(input, 'test@example.com')
      expect(mockOnChangeText).toHaveBeenCalledWith('test@example.com')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })

    it('rejects invalid email input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="email"
          placeholder="Email input"
          validationRules={[
            {
              validate: (value: string) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
              message: 'Invalid email',
            },
          ]}
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Email input')

      fireEvent.changeText(input, 'invalid-email')
      expect(mockOnChangeText).toHaveBeenCalledWith('invalid-email')
      expect(mockOnValidationChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Password Input Validation', () => {
    it('validates password length', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="password"
          placeholder="Password input"
          validationRules={[
            {
              validate: (value: string) => value.length >= 6,
              message: 'Password too short',
            },
          ]}
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Password input')

      fireEvent.changeText(input, 'short')
      expect(mockOnChangeText).toHaveBeenCalledWith('short')
      expect(mockOnValidationChange).toHaveBeenCalledWith(false)

      fireEvent.changeText(input, 'longer-password')
      expect(mockOnChangeText).toHaveBeenCalledWith('longer-password')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })
})
