import FormInput from '@/components/common/form-input'
// Importe apenas o que os testes em si precisarão no escopo global.
import { render } from '@testing-library/react-native'

jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')
  const MockIconComponent = (props: { name: string }) => (
    <Text testID="mock-icon">{props.name}</Text>
  )

  return {
    __esModule: true,
    default: MockIconComponent,
    Ionicons: MockIconComponent,
    MaterialIcons: MockIconComponent,
    MaterialCommunityIcons: MockIconComponent,
    FontAwesome: MockIconComponent,
    AntDesign: MockIconComponent,
    Entypo: MockIconComponent,
    Feather: MockIconComponent,
  }
})

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

    it('announces error message visually', () => {
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
    it('has correct hint for number input', () => {
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
    })

    it('has correct hint for password input', () => {
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
    })
  })

  describe('Required Field Accessibility', () => {
    it('indicates required field', () => {
      const { getByPlaceholderText } = render(
        <FormInput
          placeholder="Required field"
          label="Required field"
          required
          value=""
          onChangeText={() => {}}
        />
      )
      const input = getByPlaceholderText('Required field')
      expect(input.props.accessibilityLabel).toContain('Required field')
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
      expect(input.props.accessibilityState).toHaveProperty('disabled', true)
    })
  })
})
