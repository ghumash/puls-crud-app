import { z } from 'zod'
import { isValidPhone, getPhoneValidationMessage } from '@/shared/lib'

export const userSchema = z.object({
  name: z.string().trim().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  phone: z
    .string()
    .trim()
    .min(1, 'Укажите телефон')
    .refine((phone) => isValidPhone(phone), getPhoneValidationMessage()),
  role: z.enum(['Admin', 'User', 'Manager'], {
    required_error: 'Выберите роль',
  }),
})

export type UserForm = z.infer<typeof userSchema>
