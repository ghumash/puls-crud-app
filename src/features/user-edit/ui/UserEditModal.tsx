'use client'

import { useMemo } from 'react'
import { Modal } from 'antd'
import type { UserForm, User } from '@/entities/user'
import { updateUser } from '../api/updateUser'
import { showApiError, showSuccessMessage, getUserFormData } from '@/shared/lib'
import { UserFormFields, useUserModal } from '@/features/user-form'

interface UserEditModalProps {
  open: boolean
  user: User | null
  onCancel: () => void
  onSuccess: () => void
}

export function UserEditModal({ open, user, onCancel, onSuccess }: UserEditModalProps) {
  const defaultValues = useMemo(() => (user ? getUserFormData(user) : undefined), [user])

  const handleSubmit = async (data: UserForm) => {
    if (!user) return

    try {
      await updateUser(user.id, data)
      showSuccessMessage('Пользователь обновлён')
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при обновлении пользователя')
    }
  }

  const {
    control,
    errors,
    isSubmitting,
    handleSubmit: onSubmit,
    handleCancel,
  } = useUserModal({
    defaultValues,
    onSubmit: handleSubmit,
    onCancel,
  })

  return (
    <Modal
      title="Редактировать пользователя"
      open={open}
      onCancel={handleCancel}
      onOk={onSubmit}
      confirmLoading={isSubmitting}
      okText="Сохранить"
      cancelText="Отменить"
    >
      <UserFormFields control={control} errors={errors} />
    </Modal>
  )
}
