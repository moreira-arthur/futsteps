import FormInput from '@/components/common/form-input'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

describe('FormInput', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with basic props', () => {
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Test input" onChangeText={mockOnChangeText} />
    )
    const input = getByPlaceholderText('Test input')
    expect(input).toBeTruthy()
  })

  it('renders with label', () => {
    const { getByText } = render(
      <FormInput label="Test Label" placeholder="Test input" />
    )
    expect(getByText('Test Label')).toBeTruthy()
  })

  it('handles text input correctly', () => {
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Text input" onChangeText={mockOnChangeText} />
    )
    const input = getByPlaceholderText('Text input')

    fireEvent.changeText(input, 'test text')
    expect(mockOnChangeText).toHaveBeenCalledWith('test text')
  })

  it('validates number input correctly', () => {
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

    fireEvent.changeText(input, 'abc')
    expect(mockOnChangeText).toHaveBeenCalledWith('')
    expect(mockOnValidationChange).toHaveBeenCalledWith(true)
  })

  it('validates decimal input correctly', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        type="decimal"
        placeholder="Decimal input"
        onChangeText={mockOnChangeText}
        onValidationChange={mockOnValidationChange}
      />
    )
    const input = getByPlaceholderText('Decimal input')

    // Test valid decimal
    fireEvent.changeText(input, '123.45')
    expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
    expect(mockOnValidationChange).toHaveBeenCalledWith(true)

    // Test comma conversion
    fireEvent.changeText(input, '123,45')
    expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
    expect(mockOnValidationChange).toHaveBeenCalledWith(true)

    // Test multiple decimal points
    fireEvent.changeText(input, '123.45.67')
    expect(mockOnChangeText).toHaveBeenCalledWith('123.4567')
    expect(mockOnValidationChange).toHaveBeenCalledWith(true)
  })

  it('validates email input correctly', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        type="email"
        placeholder="Email input"
        onChangeText={mockOnChangeText}
        validationRules={[
          {
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Must be a valid email',
          },
        ]}
        onValidationChange={mockOnValidationChange}
      />
    )
    const input = getByPlaceholderText('Email input')

    // Test valid email
    fireEvent.changeText(input, 'test@example.com')
    expect(mockOnChangeText).toHaveBeenCalledWith('test@example.com')
    expect(mockOnValidationChange).toHaveBeenCalledWith(true)

    // Test invalid email
    fireEvent.changeText(input, 'invalid-email')
    expect(mockOnChangeText).toHaveBeenCalledWith('invalid-email')
    expect(mockOnValidationChange).toHaveBeenCalledWith(false)
  })

  it('handles password visibility toggle', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormInput
        type="password"
        placeholder="Password input"
        onChangeText={mockOnChangeText}
      />
    )
    const input = getByPlaceholderText('Password input')
    const toggleButton = getByTestId('password-toggle')

    expect(input.props.secureTextEntry).toBe(true)

    fireEvent.press(toggleButton)
    expect(input.props.secureTextEntry).toBe(false)

    fireEvent.press(toggleButton)
    expect(input.props.secureTextEntry).toBe(true)
  })

  it('handles required field validation', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        placeholder="Required input"
        required
        onChangeText={mockOnChangeText}
        onValidationChange={mockOnValidationChange}
      />
    )
    const input = getByPlaceholderText('Required input')

    fireEvent.changeText(input, '')
    expect(mockOnValidationChange).toHaveBeenCalledWith(false)

    fireEvent.changeText(input, 'test')
    expect(mockOnValidationChange).toHaveBeenCalledWith(true)
  })

  it('handles disabled state', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        placeholder="Disabled input"
        editable={false}
        onChangeText={mockOnChangeText}
      />
    )
    const input = getByPlaceholderText('Disabled input')

    expect(input.props.editable).toBe(false)
    expect(input.props.accessibilityState.disabled).toBe(true)

    fireEvent.changeText(input, 'test')
    expect(mockOnChangeText).not.toHaveBeenCalled()
  })

  it('prevents SQL injection attempts', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        placeholder="Test input"
        onChangeText={mockOnChangeText}
        validationRules={[
          {
            validate: value => !value.includes("'") && !value.includes(';'),
            message: 'Invalid characters',
          },
        ]}
        onValidationChange={mockOnValidationChange}
      />
    )
    const input = getByPlaceholderText('Test input')

    // Test SQL injection attempt
    fireEvent.changeText(input, "'; DROP TABLE users; --")
    expect(mockOnChangeText).toHaveBeenCalledWith("'; DROP TABLE users; --")
    expect(mockOnValidationChange).toHaveBeenCalledWith(false)
  })

  it('shows error message when provided', () => {
    const { getByText } = render(
      <FormInput placeholder="Test input" error="This is an error message" />
    )
    expect(getByText('This is an error message')).toBeTruthy()
  })
})
