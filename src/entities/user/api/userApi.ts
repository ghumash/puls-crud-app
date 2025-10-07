import { http, type PaginatedResponse } from '@/shared/api'
import type { User } from '@/entities/user/model/types'

export type UsersResponse = PaginatedResponse<User>

export async function getUsers(page = 1, limit = 10): Promise<UsersResponse> {
  const { data, headers } = await http.get<User[]>('/users', {
    params: { page, limit },
    headers: { 'Cache-Control': 'no-cache' },
  })

  const total = parseInt(headers['x-total-count'] || headers['X-Total-Count']) || 20

  return { data, total, page, limit }
}

