'use client'

import { Modal } from 'antd'
import type { UserForm } from '@/entities/user'
import { createUser } from '../api/createUser'
import { normalizePhone, showApiError, showSuccessMessage } from '@/shared/lib'
import { useUserForm } from '@/shared/hooks'
import { UserFormFields } from '@/shared/ui'

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
  } = useUserForm()

  const onSubmit = async (data: UserForm) => {
    try {
      const normalizedData = {
        ...data,
        phone: normalizePhone(data.phone),
      }
      await createUser(normalizedData)
      showSuccessMessage('Пользователь создан')
      reset()
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при создании пользователя')
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
      <UserFormFields control={control} errors={errors} />
    </Modal>
  )
}
