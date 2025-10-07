'use client'

import { Modal, Form, Input, Select, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserForm } from '@/entities/user/model/schema'
import { createUser } from '@/entities/user/api/userApi'
import { normalizePhone } from '@/shared/lib/phone'

interface UserCreateModalProps {
  open: boolean
  onCancel: () => void
  onSuccess: () => void
}

export function UserCreateModal({ open, onCancel, onSuccess }: UserCreateModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  })

  const onSubmit = async (data: UserForm) => {
    try {
      const normalizedData = {
        ...data,
        phone: normalizePhone(data.phone),
      }
      await createUser(normalizedData)
      message.success('Пользователь создан')
      reset()
      onSuccess()
    } catch (error) {
      message.error(`Ошибка при создании пользователя: ${error}`)
    }
  }

  const handleCancel = () => {
    reset()
    onCancel()
  }

  return (
    <Modal
      title="Добавить пользователя"
      open={open}
      onCancel={handleCancel}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isSubmitting}
      okText="Создать"
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
