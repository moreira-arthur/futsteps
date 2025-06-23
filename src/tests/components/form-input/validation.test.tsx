import FormInput from '@/components/common/form-input'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

describe('FormInput Validation', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Number Input Validation', () => {
    it('accepts valid numeric input', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="number"
          placeholder="Number input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Number input')

      await act(async () => {
        fireEvent.changeText(input, '123')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('123')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })

    it('rejects non-numeric input', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="number"
          placeholder="Number input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Number input')

      await act(async () => {
        fireEvent.changeText(input, 'abc')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('Decimal Input Validation', () => {
    it('accepts valid decimal input', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      await act(async () => {
        fireEvent.changeText(input, '123.45')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })

    it('converts comma to decimal point', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      await act(async () => {
        fireEvent.changeText(input, '123,45')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })

    it('normalizes multiple decimal points to single point', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      await act(async () => {
        fireEvent.changeText(input, '123.45.67')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('123.4567')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })

    it('rejects non-numeric input', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="decimal"
          placeholder="Decimal input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Decimal input')

      await act(async () => {
        fireEvent.changeText(input, 'abc')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('Email Input Validation', () => {
    it('accepts valid email input', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="email"
          placeholder="Email input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Email input')

      await act(async () => {
        fireEvent.changeText(input, 'test@example.com')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('test@example.com')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })

    it('rejects invalid email input', async () => {
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

      await act(async () => {
        fireEvent.changeText(input, 'invalid-email')
      })

      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('invalid-email')
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('Password Input Validation', () => {
    it('validates password length', async () => {
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

      await act(async () => {
        fireEvent.changeText(input, 'short')
      })
      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('short')
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      })

      await act(async () => {
        fireEvent.changeText(input, 'longer-password')
      })
      await waitFor(() => {
        expect(mockOnChangeText).toHaveBeenCalledWith('longer-password')
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })
  })
})
