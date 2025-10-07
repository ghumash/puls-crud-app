import { http } from '@/shared/api'

export async function deleteUser(id: string): Promise<void> {
  await http.delete(`/users/${id}`)
}
