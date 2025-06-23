import FormInput from '@/components/common/form-input'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput Accessibility', () => {
  describe('Label Accessibility', () => {
    it('has accessible label', () => {
      const { getByPlaceholderText } = render(
        <FormInput placeholder="Test input" value="" onChangeText={() => {}} />
      )
      const input = getByPlaceholderText('Test input')
      expect(input.props.accessibilityLabel).toBe('Test input')
    })

    it('has accessible hint when provided', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          value=""
          onChangeText={() => {}}
          accessibilityHint="Enter your test value"
        />
      )
      const input = getByPlaceholderText('Test input')
      expect(input.props.accessibilityHint).toBe('Enter your test value')
    })
  })

  describe('Error Accessibility', () => {
    it('announces error state', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          error="Invalid input"
          value="test"
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Test input')
      expect(input.props.accessibilityHint).toContain('Invalid input')
    })

    it('announces error message', () => {
      const { getByText } = render(
        <FormInput
          placeholder="Test input"
          error="This is an error message"
          value="test"
          onChangeText={() => {}}
        />
      )
      expect(getByText('This is an error message')).toBeTruthy()
    })
  })

  describe('Input Type Accessibility', () => {
    it('has correct role for number input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Enter number"
          type="number"
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Enter number')
      expect(input.props.accessibilityRole).toBe('text')
      expect(input.props.accessibilityHint).toContain('numeric input')
    })

    it('has correct role for password input', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Enter password"
          type="password"
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Enter password')
      expect(input.props.accessibilityRole).toBe('text')
      expect(input.props.accessibilityHint).toContain('password input')
    })
  })

  describe('Required Field Accessibility', () => {
    it('indicates required field', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Required field"
          required
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Required field')
      expect(input.props.accessibilityLabel).toContain('(required)')
    })
  })

  describe('Disabled State Accessibility', () => {
    it('indicates disabled state', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Disabled input"
          editable={false}
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Disabled input')
      expect(input.props.accessibilityHint).toContain('disabled')
      expect(input.props.accessibilityState.disabled).toBe(true)
    })
  })
})
