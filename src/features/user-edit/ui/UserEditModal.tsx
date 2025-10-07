'use client'

import { Modal, Form, Input, Select, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserForm } from '@/entities/user/model/schema'
import { updateUser } from '@/entities/user/api/userApi'
import { normalizePhone } from '@/shared/lib/phone'
import type { User } from '@/entities/user/model/types'
import { useEffect } from 'react'

interface UserEditModalProps {
  open: boolean
  user: User | null
  onCancel: () => void
  onSuccess: () => void
}

export function UserEditModal({ open, user, onCancel, onSuccess }: UserEditModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UserForm) => {
    if (!user) return

    try {
      const normalizedData = {
        ...data,
        phone: normalizePhone(data.phone),
      }
      await updateUser(user.id, normalizedData)
      message.success('Пользователь обновлен')
      onSuccess()
    } catch (error) {
      message.error(`Ошибка при обновлении пользователя: ${error}`)
    }
  }

  const handleCancel = () => {
    reset()
    onCancel()
  }

  return (
    <Modal
      title="Редактировать пользователя"
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isSubmitting}
      okText="Сохранить"
      cancelText="Отменить"
    >
      <Form layout="vertical">
        <Form.Item
          label="Имя"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Введите имя" />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="example@email.com" />}
          />
        </Form.Item>

        <Form.Item
          label="Телефон"
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input {...field} placeholder="+7 (999) 123-45-67" />}
          />
        </Form.Item>

        <Form.Item
          label="Роль"
          validateStatus={errors.role ? 'error' : ''}
          help={errors.role?.message}
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Выберите роль">
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="User">User</Select.Option>
                <Select.Option value="Manager">Manager</Select.Option>
              </Select>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
