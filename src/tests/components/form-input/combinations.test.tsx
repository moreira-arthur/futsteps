import FormInput from '@/components/common/form-input'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput Combinations', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Required + Validation', () => {
    it('handles required field with validation', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Required input"
          required
          validationRules={[
            {
              validate: (value: string) => value.length >= 3,
              message: 'Too short',
            },
          ]}
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Required input')

      // Test empty required field
      fireEvent.changeText(input, '')
      expect(mockOnValidationChange).toHaveBeenCalledWith(false)

      // Test valid input
      fireEvent.changeText(input, 'abc')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Error + Password', () => {
    it('handles error state with password visibility', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <FormInput
          type="password"
          placeholder="Password input"
          error="Invalid password"
          onChangeText={mockOnChangeText}
        />
      )
      const input = getByPlaceholderText('Password input')
      const toggleButton = getByTestId('password-toggle')

      // Initially password should be hidden
      expect(input.props.secureTextEntry).toBe(true)

      // Toggle password visibility
      fireEvent.press(toggleButton)
      expect(input.props.secureTextEntry).toBe(false)

      // Error should still be visible
      expect(input.props.accessibilityHint).toContain('Invalid password')
    })
  })

  describe('Disabled + Validation', () => {
    it('handles disabled state with validation', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Disabled input"
          editable={false}
          validationRules={[
            {
              validate: (value: string) => value.length >= 3,
              message: 'Too short',
            },
          ]}
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Disabled input')

      // Input should be disabled
      expect(input.props.editable).toBe(false)
      expect(input.props.accessibilityState.disabled).toBe(true)

      // Try to change text (should not work)
      fireEvent.changeText(input, 'abc')
      expect(mockOnChangeText).not.toHaveBeenCalled()
    })
  })

  describe('Type + Required + Error', () => {
    it('handles type-specific validation with required and error states', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Email input"
          type="email"
          required
          error="Invalid email"
          value=""
          onChangeText={() => {}}
          accessibilityHint="Enter your email address"
        />
      )
      const input = getByPlaceholderText('Email input')

      // Check accessibility states
      expect(input.props.accessibilityHint).toContain('Invalid email')
      expect(input.props.accessibilityLabel).toBe(
        'Email input (required) (email)'
      )

      // Test valid email
      fireEvent.changeText(input, 'test@example.com')
      expect(input.props.accessibilityHint).toBe('Enter your email address')
    })

    it('handles password input with all states', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <FormInput
          placeholder="Password input"
          type="password"
          required
          error="Invalid password"
          editable={false}
          value=""
          onChangeText={() => {}}
          accessibilityHint="Enter your password"
        />
      )
      const input = getByPlaceholderText('Password input')
      const toggleButton = getByTestId('password-toggle')

      // Check accessibility states
      expect(input.props.accessibilityHint).toContain('Invalid password')
      expect(input.props.accessibilityHint).toContain('disabled')
      expect(input.props.accessibilityHint).toContain('password input')
      expect(input.props.accessibilityLabel).toBe(
        'Password input (required) (password)'
      )

      // Toggle button should be disabled
      expect(toggleButton.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Decimal + Required + Error', () => {
    it('handles decimal input with required and error states', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          required
          error="Invalid decimal"
          validationRules={[
            {
              validate: (value: string) => !Number.isNaN(Number(value)),
              message: 'Invalid decimal',
            },
          ]}
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      // Test invalid decimal
      fireEvent.changeText(input, 'abc')
      expect(mockOnValidationChange).toHaveBeenCalledWith(false)

      // Test valid decimal with comma
      fireEvent.changeText(input, '123,45')
      expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)

      // Test multiple decimal points (should be normalized to one)
      fireEvent.changeText(input, '123.45.67')
      expect(mockOnChangeText).toHaveBeenCalledWith('123.4567')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Password + Required + Error + Disabled', () => {
    it('handles password input with all states', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <FormInput
          placeholder="Password input"
          type="password"
          required
          error="Invalid password"
          editable={false}
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Password input')
      const toggleButton = getByTestId('password-toggle')

      // Check accessibility states
      expect(input.props.accessibilityHint).toContain('Invalid password')
      expect(input.props.accessibilityHint).toContain('disabled')
      expect(input.props.accessibilityLabel).toContain('(required)')
      expect(input.props.accessibilityLabel).toContain('(password)')

      // Toggle button should be disabled
      expect(toggleButton.props.accessibilityState.disabled).toBe(true)
    })
  })
})
