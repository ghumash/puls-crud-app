import type { UserForm, User } from '@/entities/user'

export function getUserFormData(user: User): UserForm {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }
}
