'use client'

import { Table, Button, Space, Tag } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { memo, useMemo } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { User, Role } from '@/entities/user'
import { ROLE_COLORS } from '@/entities/user'
import { UserDeleteButton } from '@/features/user-delete'
import { TABLE_PAGINATION_CONFIG } from '@/shared/config'
import { formatPhoneForDisplay } from '@/shared/lib'
import { UsersTableSkeleton } from './UsersTableSkeleton'

interface UsersTableProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onCreate: () => void
  onRefresh: () => void
  pagination: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize?: number) => void
  }
}

function UsersTableComponent({
  users,
  loading,
  onEdit,
  onCreate,
  onRefresh,
  pagination,
}: UsersTableProps) {
  const columns: ColumnsType<User> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
      },
      {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        render: (phone: string) => formatPhoneForDisplay(phone),
      },
      {
        title: 'Роль',
        dataIndex: 'role',
        key: 'role',
        render: (role: Role) => <Tag color={ROLE_COLORS[role]}>{role}</Tag>,
      },
      {
        title: 'Действия',
        key: 'actions',
        width: 120,
        render: (_, record) => (
          <Space size="small">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
            <UserDeleteButton userId={record.id} userName={record.name} onSuccess={onRefresh} />
          </Space>
        ),
      },
    ],
    [onEdit, onRefresh]
  )

  if (loading) {
    return <UsersTableSkeleton />
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
          Добавить пользователя
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={false}
        rowKey="id"
        pagination={{
          ...pagination,
          ...TABLE_PAGINATION_CONFIG,
        }}
      />
    </div>
  )
}

export const UsersTable = memo(UsersTableComponent)
