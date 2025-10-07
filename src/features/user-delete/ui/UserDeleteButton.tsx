'use client'

import { Popconfirm, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteUser } from '../api/deleteUser'
import { showApiError, showSuccessMessage } from '@/shared/lib'
import { useState } from 'react'

interface UserDeleteButtonProps {
  userId: string
  userName: string
  onSuccess: () => void
}

export function UserDeleteButton({ userId, userName, onSuccess }: UserDeleteButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteUser(userId)
      showSuccessMessage('Пользователь удалён')
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при удалении пользователя')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popconfirm
      title="Удалить пользователя"
      description={`Вы уверены, что хотите удалить пользователя "${userName}"?`}
      onConfirm={handleDelete}
      okText="Да"
      cancelText="Нет"
    >
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        loading={loading}
        size="small"
      />
    </Popconfirm>
  )
}
