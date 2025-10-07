'use client'

import { Modal } from 'antd'
import type { UserForm, User } from '@/entities/user'
import { updateUser } from '../api/updateUser'
import { normalizePhone, showApiError, showSuccessMessage, getUserFormData } from '@/shared/lib'
import { useEffect } from 'react'
import { useUserForm } from '@/shared/hooks'
import { UserFormFields } from '@/shared/ui'

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
  } = useUserForm()

  useEffect(() => {
    if (user) {
      reset(getUserFormData(user))
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
      showSuccessMessage('Пользователь обновлён')
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при обновлении пользователя')
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
      <UserFormFields control={control} errors={errors} />
    </Modal>
  )
}
