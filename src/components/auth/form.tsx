import { useState } from 'react'
import { Text, View } from 'react-native'
import { MyButton } from '../common/button'
import FormInput from '../common/form-input'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: { name?: string; email: string; password: string }) => void
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }

  const validateForm = () => {
    const errors = { ...formErrors }
    let isValid = true

    if (mode === 'register') {
      // Validate name
      if (!formData.name) {
        errors.name = 'Nome é obrigatório'
        isValid = false
      } else if (formData.name.length < 3) {
        errors.name = 'Nome deve ter pelo menos 3 caracteres'
        isValid = false
      }
    }

    // Validate email
    if (!formData.email) {
      errors.email = 'E-mail é obrigatório'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'E-mail inválido'
      isValid = false
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Senha é obrigatória'
      isValid = false
    } else if (formData.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      if (mode === 'login') {
        onSubmit({ email: formData.email, password: formData.password })
      } else {
        onSubmit({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      }
    }
  }

  return (
    <View className="w-full max-w-md items-center gap-6">
      <Text className="text-3xl text-yl-400 font-manropeBold mb-2">
        {mode === 'login' ? 'Entrar na sua conta' : 'Criar uma nova conta'}
      </Text>
      {mode === 'register' && (
        <FormInput
          label="Nome"
          placeholder="Nome"
          value={formData.name}
          onChangeText={handleInputChange('name')}
          error={formErrors.name}
          validationRules={[
            {
              validate: value => value.length >= 3,
              message: 'Nome deve ter pelo menos 3 caracteres',
            },
          ]}
        />
      )}
      <FormInput
        label="E-mail"
        placeholder="E-mail"
        value={formData.email}
        onChangeText={handleInputChange('email')}
        type="email"
        error={formErrors.email}
        validationRules={[
          {
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'E-mail inválido',
          },
        ]}
      />
      <FormInput
        label="Senha"
        placeholder="Senha"
        value={formData.password}
        onChangeText={handleInputChange('password')}
        type="password"
        secureTextEntry
        error={formErrors.password}
        validationRules={[
          {
            validate: value => value.length >= 6,
            message: 'Senha deve ter pelo menos 6 caracteres',
          },
        ]}
      />
      <MyButton
        title={mode === 'login' ? 'ENTRAR' : 'REGISTRAR'}
        onPress={handleSubmit}
      />
    </View>
  )
}
