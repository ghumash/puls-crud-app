'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, message } from 'antd'
import { UsersTable } from '@/widgets/users-table/ui/UsersTable'
import { UserCreateModal } from '@/features/user-create/ui/UserCreateModal'
import { UserEditModal } from '@/features/user-edit/ui/UserEditModal'
import { getUsers } from '@/entities/user/api/userApi'
import type { User } from '@/entities/user/model/types'
import { config } from '@/shared/config'

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const response = await getUsers(page, config.pagination.defaultPageSize)
      setUsers(response.data)
      setTotalUsers(response.total)
    } catch (error) {
      message.error(`Ошибка при загрузке пользователей: ${error}`)
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
    setCreateModalOpen(false)
    fetchUsers(currentPage)
  }

  const handleEditSuccess = () => {
    setEditModalOpen(false)
    setEditingUser(null)
    fetchUsers(currentPage)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setEditModalOpen(true)
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
          onCreate={() => setCreateModalOpen(true)}
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
        onCancel={() => setCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <UserEditModal
        open={editModalOpen}
        user={editingUser}
        onCancel={() => {
          setEditModalOpen(false)
          setEditingUser(null)
        }}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}
