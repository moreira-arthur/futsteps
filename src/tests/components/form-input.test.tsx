import FormInput from '@/components/common/form-input'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import React from 'react'

// Mocka o componente de ícone para isolar o teste e evitar efeitos colaterais.
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'Icon')

describe('FormInput', () => {
  const mockOnChangeText = jest.fn()
  const mockOnValidationChange = jest.fn()

  // Limpa os mocks antes de cada teste para garantir isolamento.
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar corretamente com props básicas', () => {
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Test input" onChangeText={mockOnChangeText} />
    )
    expect(getByPlaceholderText('Test input')).toBeTruthy()
  })

  it('deve renderizar com um label', () => {
    const { getByText } = render(
      <FormInput label="Test Label" placeholder="Test input" />
    )
    expect(getByText('Test Label')).toBeTruthy()
  })

  it('deve lidar com a entrada de texto corretamente', () => {
    const { getByPlaceholderText } = render(
      <FormInput placeholder="Text input" onChangeText={mockOnChangeText} />
    )
    const input = getByPlaceholderText('Text input')

    fireEvent.changeText(input, 'test text')
    expect(mockOnChangeText).toHaveBeenCalledWith('test text')
  })

  describe('Validação de Tipos', () => {
    it('deve permitir apenas números quando o tipo for "number"', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="number"
          placeholder="Number input"
          onChangeText={mockOnChangeText}
        />
      )
      const input = getByPlaceholderText('Number input')

      fireEvent.changeText(input, '123')
      expect(mockOnChangeText).toHaveBeenCalledWith('123')
    })

    it('deve limpar o input para caracteres não numéricos quando o tipo for "number"', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="number"
          placeholder="Number input"
          onChangeText={mockOnChangeText}
        />
      )
      const input = getByPlaceholderText('Number input')

      fireEvent.changeText(input, 'abc')
      expect(mockOnChangeText).toHaveBeenCalledWith('')
    })

    it('deve validar corretamente a entrada de um email inválido', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          type="email"
          placeholder="Email input"
          onChangeText={mockOnChangeText}
          onValidationChange={mockOnValidationChange}
          validationRules={[
            {
              validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
              message: 'Must be a valid email',
            },
          ]}
        />
      )
      const input = getByPlaceholderText('Email input')

      fireEvent.changeText(input, 'invalid-email')

      await waitFor(() => {
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('Funcionalidade de Senha', () => {
    it('deve alternar a visibilidade da senha ao clicar no ícone', async () => {
      const { getByPlaceholderText, getByTestId } = render(
        <FormInput type="password" placeholder="Password input" />
      )
      const input = getByPlaceholderText('Password input')
      const toggleButton = getByTestId('password-toggle')

      // Estado inicial: a senha está segura.
      expect(input.props.secureTextEntry).toBe(true)

      // Clica para mostrar a senha.
      fireEvent.press(toggleButton)

      // Usa waitFor para esperar a re-renderização após a atualização do estado.
      await waitFor(() => {
        expect(input.props.secureTextEntry).toBe(false)
      })

      // Clica novamente para esconder.
      fireEvent.press(toggleButton)

      await waitFor(() => {
        expect(input.props.secureTextEntry).toBe(true)
      })
    })
  })

  describe('Validação de Regras', () => {
    it('deve falhar na validação quando um campo obrigatório é esvaziado', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Required input"
          required
          onValidationChange={mockOnValidationChange}
          value="texto inicial" // Começa com valor para poder esvaziar.
        />
      )
      const input = getByPlaceholderText('Required input')

      fireEvent.changeText(input, '')

      await waitFor(() => {
        expect(mockOnValidationChange).toHaveBeenCalledWith(false)
      })
    })

    it('deve passar na validação quando um campo obrigatório é preenchido', async () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Required input"
          required
          onValidationChange={mockOnValidationChange}
        />
      )
      const input = getByPlaceholderText('Required input')

      fireEvent.changeText(input, 'test')

      await waitFor(() => {
        expect(mockOnValidationChange).toHaveBeenCalledWith(true)
      })
    })
  })

  it('deve estar desabilitado quando editable for false', () => {
    const { getByPlaceholderText } = render(
      <FormInput
        placeholder="Disabled input"
        editable={false}
        onChangeText={mockOnChangeText}
      />
    )
    const input = getByPlaceholderText('Disabled input')

    expect(input.props.editable).toBe(false)

    fireEvent.changeText(input, 'test')
    expect(mockOnChangeText).not.toHaveBeenCalled()
  })

  it('deve mostrar uma mensagem de erro quando a prop error for fornecida', () => {
    const { getByText } = render(
      <FormInput placeholder="Test input" error="Esta é uma mensagem de erro" />
    )
    expect(getByText('Esta é uma mensagem de erro')).toBeTruthy()
  })
})
