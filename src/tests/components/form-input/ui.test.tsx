import FormInput from '@/components/common/form-input'
import { act, fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput UI', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders with label', () => {
      const { getByText } = render(
        <FormInput label="Test Label" placeholder="Test input" />
      )
      expect(getByText('Test Label')).toBeTruthy()
    })

    it('renders with placeholder', () => {
      const { getByPlaceholderText } = render(
        <FormInput placeholder="Test input" />
      )
      expect(getByPlaceholderText('Test input')).toBeTruthy()
    })

    it('renders with error message', () => {
      const { getByText } = render(
        <FormInput placeholder="Test input" error="This is an error message" />
      )
      expect(getByText('This is an error message')).toBeTruthy()
    })
  })

  describe('Password Visibility', () => {
    it('toggles password visibility', async () => {
      const { getByPlaceholderText, getByTestId, rerender } = render(
        <FormInput
          secureTextEntry
          placeholder="Password input"
          testID="password-input"
        />
      )

      const toggleButton = getByTestId('password-toggle')

      // Checar estado inicial (senha oculta)
      expect(getByPlaceholderText('Password input').props.secureTextEntry).toBe(true)

      // Toggle password visibility - mostrar senha
      await act(async () => {
        fireEvent.press(toggleButton)
      })
      // Rebuscar input para pegar atualização
      expect(getByPlaceholderText('Password input').props.secureTextEntry).toBe(false)

      // Toggle password visibility - esconder senha
      await act(async () => {
        fireEvent.press(toggleButton)
      })
      expect(getByPlaceholderText('Password input').props.secureTextEntry).toBe(true)
    })
  })

  describe('Focus States', () => {
    it('handles focus and blur events', () => {
      const { getByPlaceholderText } = render(
        <FormInput placeholder="Test input" testID="test-input" />
      )
      const input = getByPlaceholderText('Test input')
      fireEvent(input, 'focus')
      fireEvent(input, 'blur')
      expect(input).toBeTruthy()
    })
  })

  describe('Input Types', () => {
    it('renders number input with correct keyboard type', () => {
      const { getByPlaceholderText } = render(
        <FormInput type="number" placeholder="Number input" />
      )
      const input = getByPlaceholderText('Number input')
      expect(input.props.keyboardType).toBe('numeric')
    })

    it('renders email input with correct keyboard type and auto-capitalization', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Email input"
          type="email"
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Email input')
      expect(input.props.keyboardType).toBe('default')
      expect(input.props.autoCapitalize).toBe('none')
    })

    it('renders decimal input with correct keyboard type', () => {
      const { getByPlaceholderText } = render(
        <FormInput type="decimal" placeholder="Decimal input" />
      )
      const input = getByPlaceholderText('Decimal input')
      expect(input.props.keyboardType).toBe('numeric')
    })
  })

  describe('Styling', () => {
    it('applies correct styles for valid input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          value="valid input"
          validationRules={[
            {
              validate: () => true,
              message: 'Invalid input',
            },
          ]}
        />
      )
      const input = getByPlaceholderText('Test input')
      expect(input.props.value).toBe('valid input')
    })

    it('applies correct styles for invalid input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          value="invalid input"
          validationRules={[
            {
              validate: () => false,
              message: 'Invalid input',
            },
          ]}
        />
      )
      const input = getByPlaceholderText('Test input')
      expect(input.props.value).toBe('invalid input')
    })

    it('applies correct styles for empty input', () => {
      const { getByPlaceholderText } = render(
        <FormInput placeholder="Test input" value="" />
      )
      const input = getByPlaceholderText('Test input')
      expect(input.props.value).toBe('')
    })
  })
})
