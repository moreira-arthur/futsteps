import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
  name: string
  email: string
  password: string
}

const USERS_KEY = 'users'

export async function getUsers(): Promise<User[]> {
  const data = await AsyncStorage.getItem(USERS_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function saveUser(user: User): Promise<void> {
  const users = await getUsers()
  users.push(user)
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function findUserByEmailAndPassword(
  email: string,
  password: string
): Promise<User | undefined> {
  const users = await getUsers()
  return users.find(u => u.email === email && u.password === password)
}
