import { http } from '@/shared/api/http'
import type { User } from '@/entities/user/model/types'

export interface UsersResponse {
  data: User[]
  total: number
}

export async function getUsers(page = 1, limit = 10): Promise<UsersResponse> {
  const { data } = await http.get<User[]>('/users', { params: { page, limit } })
  return { data, total: data.length }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { data } = await http.post<User>('/users', user)
  return data
}

export async function updateUser(id: string, user: Omit<User, 'id'>): Promise<User> {
  const { data } = await http.put<User>(`/users/${id}`, user)
  return data
}

export async function deleteUser(id: string): Promise<void> {
  await http.delete(`/users/${id}`)
}
