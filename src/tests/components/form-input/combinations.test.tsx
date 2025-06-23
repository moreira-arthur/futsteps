import FormInput from '@/components/common/form-input'
import { act, fireEvent, render } from '@testing-library/react-native' // Importação do 'act'
import React from 'react'

describe('FormInput Combinations', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Required + Validation', () => {
    it('handles required field with validation', async () => {
      // Função de teste assíncrona
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

      // Teste campo requerido vazio
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, '')
      })
      expect(mockOnValidationChange).toHaveBeenCalledWith(false)

      // Teste input válido
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, 'abc')
      })
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Error + Password', () => {
    it('handles error state with password visibility', async () => {
      // Função de teste assíncrona
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

      // Inicialmente, a senha deve estar oculta
      expect(input.props.secureTextEntry).toBe(true)

      // Alternar visibilidade da senha
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.press(toggleButton)
      })
      expect(input.props.secureTextEntry).toBe(false)

      // O erro ainda deve estar visível
      expect(input.props.accessibilityHint).toContain('Invalid password')
    })
  })

  describe('Disabled + Validation', () => {
    it('handles disabled state with validation', async () => {
      // Função de teste assíncrona
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

      // Input deve estar desabilitado
      expect(input.props.editable).toBe(false)
      expect(input.props.accessibilityState.disabled).toBe(true)

      // Tentar mudar o texto (não deve funcionar)
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, 'abc')
      })
      expect(mockOnChangeText).not.toHaveBeenCalled()
    })
  })

  describe('Type + Required + Error', () => {
    it('handles type-specific validation with required and error states', async () => {
      // Função de teste assíncrona
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

      // Verificar estados de acessibilidade
      expect(input.props.accessibilityHint).toContain('Invalid email')
      expect(input.props.accessibilityLabel).toBe(
        'Email input (required) (email)'
      )

      // Testar e-mail válido
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, 'test@example.com')
      })
      // A expectativa pode precisar ser ajustada dependendo de como o componente FormInput lida com a validação interna e a propriedade 'error'
      // Se o erro for removido ao digitar um valor válido, a expectativa abaixo será verdadeira.
      // Caso contrário, você pode precisar simular a limpeza do erro.
      expect(input.props.accessibilityHint).toBe('Enter your email address')
    })

    it('handles password input with all states', async () => {
      // Função de teste assíncrona
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

      // Verificar estados de acessibilidade
      expect(input.props.accessibilityHint).toContain('Invalid password')
      expect(input.props.accessibilityHint).toContain('disabled')
      expect(input.props.accessibilityHint).toContain('password input')
      expect(input.props.accessibilityLabel).toBe(
        'Password input (required) (password)'
      )

      // Botão de alternância deve estar desabilitado
      expect(toggleButton.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Decimal + Required + Error', () => {
    it('handles decimal input with required and error states', async () => {
      // Função de teste assíncrona
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

      // Testar decimal inválido
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, 'abc')
      })
      expect(mockOnValidationChange).toHaveBeenCalledWith(false)

      // Testar decimal válido com vírgula
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, '123,45')
      })
      expect(mockOnChangeText).toHaveBeenCalledWith('123.45')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)

      // Testar múltiplos pontos decimais (deve ser normalizado para um)
      await act(async () => {
        // Envolvendo fireEvent em act
        fireEvent.changeText(input, '123.45.67')
      })
      expect(mockOnChangeText).toHaveBeenCalledWith('123.4567')
      expect(mockOnValidationChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Password + Required + Error + Disabled', () => {
    it('handles password input with all states', async () => {
      // Função de teste assíncrona
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

      // Verificar estados de acessibilidade
      expect(input.props.accessibilityHint).toContain('Invalid password')
      expect(input.props.accessibilityHint).toContain('disabled')
      expect(input.props.accessibilityLabel).toContain('(required)')
      expect(input.props.accessibilityLabel).toContain('(password)')

      // Botão de alternância deve estar desabilitado
      expect(toggleButton.props.accessibilityState.disabled).toBe(true)
    })
  })
})
