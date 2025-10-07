'use client'

import { Modal } from 'antd'
import type { UserForm } from '@/entities/user'
import { createUser } from '../api/createUser'
import { showApiError, showSuccessMessage } from '@/shared/lib'
import { UserFormFields, useUserModal } from '@/features/user-form'

interface UserCreateModalProps {
  open: boolean
  onCancel: () => void
  onSuccess: () => void
}

export function UserCreateModal({ open, onCancel, onSuccess }: UserCreateModalProps) {
  const handleSubmit = async (data: UserForm) => {
    try {
      await createUser(data)
      showSuccessMessage('Пользователь создан')
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при создании пользователя')
    }
  }

  const {
    control,
    errors,
    isSubmitting,
    handleSubmit: onSubmit,
    handleCancel,
  } = useUserModal({
    onSubmit: handleSubmit,
    onCancel,
  })

  return (
    <Modal
      title="Добавить пользователя"
      open={open}
      onCancel={handleCancel}
      onOk={onSubmit}
      confirmLoading={isSubmitting}
      okText="Создать"
      cancelText="Отменить"
      width="100%"
      style={{ maxWidth: 480, top: 20 }}
      styles={{
        body: {
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        },
      }}
    >
      <UserFormFields control={control} errors={errors} />
    </Modal>
  )
}
