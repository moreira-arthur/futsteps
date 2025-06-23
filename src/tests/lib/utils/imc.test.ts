import { calculateIMC, getIMCClassification } from '../../../lib/utils/imc'

describe('IMC Utils', () => {
  describe('calculateIMC', () => {
    it('should calculate IMC correctly', () => {
      const weight = 70
      const height = 1.75
      const expectedIMC = 22.86

      const result = calculateIMC(weight, height)

      expect(result).toBeCloseTo(expectedIMC, 2)
    })

    it('should throw error when weight is zero', () => {
      const weight = 0
      const height = 1.75

      expect(() => calculateIMC(weight, height)).toThrow(
        'O peso deve ser maior que zero'
      )
    })

    it('should throw error when weight is negative', () => {
      const weight = -70
      const height = 1.75

      expect(() => calculateIMC(weight, height)).toThrow(
        'O peso deve ser maior que zero'
      )
    })

    it('should throw error when height is zero', () => {
      const weight = 70
      const height = 0

      expect(() => calculateIMC(weight, height)).toThrow(
        'A altura deve ser maior que zero'
      )
    })

    it('should throw error when height is negative', () => {
      const weight = 70
      const height = -1.75

      expect(() => calculateIMC(weight, height)).toThrow(
        'A altura deve ser maior que zero'
      )
    })

    it('should throw error when height is greater than 3 meters', () => {
      const weight = 70
      const height = 3.1

      expect(() => calculateIMC(weight, height)).toThrow(
        'A altura deve ser informada em metros'
      )
    })

    it('rounds result to 2 decimal places', () => {
      expect(calculateIMC(75.5, 1.78)).toBe(23.83)
      expect(calculateIMC(68.3, 1.72)).toBe(23.09)
    })
  })

  describe('getIMCClassification', () => {
    it('returns correct classification for different IMC values', () => {
      expect(getIMCClassification(17)).toBe('Abaixo do peso')
      expect(getIMCClassification(22)).toBe('Peso normal')
      expect(getIMCClassification(27)).toBe('Sobrepeso')
      expect(getIMCClassification(32)).toBe('Obesidade grau I')
      expect(getIMCClassification(37)).toBe('Obesidade grau II')
      expect(getIMCClassification(42)).toBe('Obesidade grau III')
    })

    it('handles boundary values correctly', () => {
      expect(getIMCClassification(18.4)).toBe('Abaixo do peso')
      expect(getIMCClassification(18.5)).toBe('Peso normal')
      expect(getIMCClassification(24.9)).toBe('Peso normal')
      expect(getIMCClassification(25)).toBe('Sobrepeso')
      expect(getIMCClassification(29.9)).toBe('Sobrepeso')
      expect(getIMCClassification(30)).toBe('Obesidade grau I')
    })
  })
})
