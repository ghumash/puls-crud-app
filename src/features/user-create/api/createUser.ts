import { http } from '@/shared/api'
import type { User } from '@/entities/user'

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { data } = await http.post<User>('/users', user)
  return data
}
