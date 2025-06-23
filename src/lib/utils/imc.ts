/**
 * Calcula o Índice de Massa Corporal (IMC)
 * @param weight Peso em quilogramas
 * @param height Altura em metros
 * @returns O valor do IMC
 * @throws Error se o peso ou altura forem inválidos
 */
export function calculateIMC(weight: number, height: number): number {
  if (weight <= 0) {
    throw new Error('O peso deve ser maior que zero')
  }

  if (height <= 0) {
    throw new Error('A altura deve ser maior que zero')
  }

  if (height > 3) {
    throw new Error('A altura deve ser informada em metros')
  }

  return Math.round((weight / (height * height)) * 100) / 100
}

/**
 * Retorna a classificação do IMC
 * @param imc Valor do IMC
 * @returns Classificação do IMC
 */
export function getIMCClassification(imc: number): string {
  if (imc < 18.5) return 'Abaixo do peso'
  if (imc < 25) return 'Peso normal'
  if (imc < 30) return 'Sobrepeso'
  if (imc < 35) return 'Obesidade grau I'
  if (imc < 40) return 'Obesidade grau II'
  return 'Obesidade grau III'
}
