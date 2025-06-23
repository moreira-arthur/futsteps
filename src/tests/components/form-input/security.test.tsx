import FormInput from '@/components/common/form-input'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput Security', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('SQL Injection Prevention', () => {
    it('prevents SQL injection attempts', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          onChangeText={mockOnChangeText}
          validationRules={[
            {
              validate: (value: string) =>
                !value.includes("'") && !value.includes(';'),
              message: 'Invalid characters',
            },
          ]}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Test input')

      // Test various SQL injection attempts
      const sqlInjectionAttempts = [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "'; SELECT * FROM users; --",
        "' UNION SELECT * FROM users; --",
        "'; UPDATE users SET password = 'hacked'; --",
      ]

      for (const attempt of sqlInjectionAttempts) {
        fireEvent.changeText(input, attempt)
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      }
    })
  })

  describe('XSS Prevention', () => {
    it('prevents XSS attacks', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          onChangeText={mockOnChangeText}
          validationRules={[
            {
              validate: (value: string) =>
                !value.includes('<') && !value.includes('>'),
              message: 'Invalid characters',
            },
          ]}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Test input')

      // Test various XSS attempts
      const xssAttempts = [
        '<script>alert("xss")</script>',
        '<img src="x" onerror="alert(\'xss\')">',
        'javascript:alert("xss")',
        '<svg onload="alert(\'xss\')">',
        '"><script>alert("xss")</script>',
      ]

      for (const attempt of xssAttempts) {
        fireEvent.changeText(input, attempt)
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      }
    })
  })

  describe('Command Injection Prevention', () => {
    it('prevents command injection attempts', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          onChangeText={mockOnChangeText}
          validationRules={[
            {
              validate: (value: string) =>
                !value.includes('|') &&
                !value.includes('&') &&
                !value.includes(';'),
              message: 'Invalid characters',
            },
          ]}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Test input')

      // Test various command injection attempts
      const commandInjectionAttempts = [
        '; rm -rf /',
        '& cat /etc/passwd',
        '| ls -la',
        '; mkdir hack',
        '& echo "hacked" > file.txt',
      ]

      for (const attempt of commandInjectionAttempts) {
        fireEvent.changeText(input, attempt)
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      }
    })
  })

  describe('Path Traversal Prevention', () => {
    it('prevents path traversal attempts', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Test input"
          onChangeText={mockOnChangeText}
          validationRules={[
            {
              validate: (value: string) =>
                !value.includes('../') && !value.includes('..\\'),
              message: 'Invalid characters',
            },
          ]}
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Test input')

      // Test various path traversal attempts
      const pathTraversalAttempts = [
        '../../../etc/passwd',
        '..\\..\\..\\windows\\system32',
        '....//....//....//etc/passwd',
        '..%2f..%2f..%2fetc/passwd',
        '..\\..\\..\\windows\\system32\\config\\SAM',
      ]

      for (const attempt of pathTraversalAttempts) {
        fireEvent.changeText(input, attempt)
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      }
    })
  })
})
