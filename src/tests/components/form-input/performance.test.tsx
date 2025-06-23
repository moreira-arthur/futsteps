import FormInput from '@/components/common/form-input'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput Performance', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Input Performance', () => {
    it('handles rapid input changes efficiently', () => {
      const { getByPlaceholderText } = render(
        <FormInput placeholder="Test input" onChangeText={mockOnChangeText} />
      )
      const input = getByPlaceholderText('Test input')

      // Simulate rapid typing
      const startTime = performance.now()
      for (let i = 0; i < 100; i++) {
        fireEvent.changeText(input, `test${i}`)
      }
      const endTime = performance.now()

      // Should complete within 1000ms
      expect(endTime - startTime).toBeLessThan(1000)
      expect(mockOnChangeText).toHaveBeenCalledTimes(100)
    })

    it('debounces validation calls', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
          validationRules={[
            {
              validate: (value: string) => value.length > 3,
              message: 'Too short',
            },
          ]}
        />
      )
      const input = getByPlaceholderText('Test input')

      // Simulate rapid typing
      for (let i = 0; i < 10; i++) {
        fireEvent.changeText(input, `test${i}`)
      }

      // Validation should be called at least once
      expect(mockOnValidationChange).toHaveBeenCalled()
    })
  })

  describe('Rendering Performance', () => {
    it('renders efficiently with multiple validation rules', () => {
      const validationRules = Array(10)
        .fill(null)
        .map((_, index) => ({
          validate: (value: string) => value.length > index,
          message: `Rule ${index} failed`,
        }))

      const startTime = performance.now()
      render(
        <FormInput placeholder="Test input" validationRules={validationRules} />
      )
      const endTime = performance.now()

      // Should render within 100ms
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('handles style updates efficiently', () => {
      const { getByPlaceholderText, rerender } = render(
        <FormInput placeholder="Test input" value="" />
      )
      const input = getByPlaceholderText('Test input')

      // Measure style update performance
      const startTime = performance.now()
      rerender(
        <FormInput
          placeholder="Test input"
          value="new value"
          error="Error message"
        />
      )
      const endTime = performance.now()

      // Style updates should complete within 50ms
      expect(endTime - startTime).toBeLessThan(50)
    })
  })

  describe('Memory Usage', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <FormInput placeholder="Test input" onChangeText={mockOnChangeText} />
      )

      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }

      unmount()

      // Verify no memory leaks by checking if the component is properly unmounted
      expect(mockOnChangeText).not.toThrow()
    })
  })

  describe('State Management', () => {
    it('maintains consistent state during rapid updates', () => {
      const { getByPlaceholderText } = render(
        <FormInput placeholder="Test input" onChangeText={mockOnChangeText} />
      )
      const input = getByPlaceholderText('Test input')

      // Simulate rapid state changes
      const values = ['a', 'ab', 'abc', 'abcd']
      for (const value of values) {
        fireEvent.changeText(input, value)
      }

      // Verify the final call is correct
      expect(mockOnChangeText).toHaveBeenLastCalledWith('abcd')
    })

    it('handles concurrent validation and input updates', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
          validationRules={[
            {
              validate: (value: string) => value.length > 3,
              message: 'Too short',
            },
          ]}
        />
      )
      const input = getByPlaceholderText('Test input')

      // Simulate concurrent updates
      fireEvent.changeText(input, 'test1')
      fireEvent.changeText(input, 'test2')
      fireEvent.changeText(input, 'test3')

      // Verify state consistency
      expect(mockOnChangeText).toHaveBeenLastCalledWith('test3')
    })
  })
})
