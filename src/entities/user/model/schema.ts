import { z } from 'zod'
import { isValidPhone } from '@/shared/lib/phone'

export const userSchema = z.object({
  name: z.string().trim().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  phone: z.string().trim().min(10, 'Укажите телефон').refine(
    (phone) => isValidPhone(phone),
    'Некорректный номер телефона'
  ),
  role: z.enum(['Admin', 'User', 'Manager'], { 
    required_error: 'Выберите роль' 
  }),
})

export type UserForm = z.infer<typeof userSchema>
