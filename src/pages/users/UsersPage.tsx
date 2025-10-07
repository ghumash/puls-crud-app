'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from 'antd'
import { UsersTable } from '@/widgets/users-table'
import { UserCreateModal } from '@/features/user-create'
import { UserEditModal } from '@/features/user-edit'
import { getUsers, type User } from '@/entities/user'
import { showApiError } from '@/shared/lib'
import { useToggle } from '@/shared/hooks'
import { config } from '@/shared/config'

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [createModalOpen, createModalControls] = useToggle(false)
  const [editModalOpen, editModalControls] = useToggle(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const response = await getUsers(page, config.pagination.defaultPageSize)
      setUsers(response.data)
      setTotalUsers(response.total)
    } catch (error) {
      showApiError(error, 'Ошибка при загрузке пользователей')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage, fetchUsers])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCreateSuccess = () => {
    createModalControls.setFalse()
    fetchUsers(currentPage)
  }

  const handleEditSuccess = () => {
    editModalControls.setFalse()
    setEditingUser(null)
    fetchUsers(currentPage)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    editModalControls.setTrue()
  }

  const handleRefresh = () => {
    fetchUsers(currentPage)
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Управление пользователями">
        <UsersTable
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onCreate={createModalControls.setTrue}
          onRefresh={handleRefresh}
          pagination={{
            current: currentPage,
            pageSize: config.pagination.defaultPageSize,
            total: totalUsers,
            onChange: handlePageChange,
          }}
        />
      </Card>

      <UserCreateModal
        open={createModalOpen}
        onCancel={createModalControls.setFalse}
        onSuccess={handleCreateSuccess}
      />

      <UserEditModal
        open={editModalOpen}
        user={editingUser}
        onCancel={() => {
          editModalControls.setFalse()
          setEditingUser(null)
        }}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}
