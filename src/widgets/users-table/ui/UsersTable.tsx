'use client'

import { Table, Button, Space, Tag } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { User, Role } from '@/entities/user/model/types'
import { UserDeleteButton } from '@/features/user-delete/ui/UserDeleteButton'
import { formatPhone } from '@/shared/lib/phone'

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

const roleColors: Record<Role, string> = {
  Admin: 'red',
  Manager: 'blue',
  User: 'green',
}

export function UsersTable({
  users,
  loading,
  onEdit,
  onCreate,
  onRefresh,
  pagination,
}: UsersTableProps) {
  const columns: ColumnsType<User> = [
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
      render: (phone: string) => formatPhone(phone),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role: Role) => (
        <Tag color={roleColors[role]}>{role}</Tag>
      ),
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
          <UserDeleteButton
            userId={record.id}
            userName={record.name}
            onSuccess={onRefresh}
          />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreate}
        >
          Добавить пользователя
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          ...pagination,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} из ${total} записей`,
        }}
      />
    </div>
  )
}
