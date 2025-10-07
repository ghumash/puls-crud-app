import { http } from '@/shared/api'
import type { User } from '@/entities/user'

export async function updateUser(id: string, user: Omit<User, 'id'>): Promise<User> {
  const { data } = await http.put<User>(`/users/${id}`, user)
  return data
}
