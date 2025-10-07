'use client'

import { Table, Button, Space, Tag, Card } from 'antd'
import { EditOutlined, PlusOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { memo, useMemo } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { User, Role } from '@/entities/user'
import { ROLE_COLORS } from '@/entities/user'
import { UserDeleteButton } from '@/features/user-delete'
import { TABLE_PAGINATION_CONFIG } from '@/shared/config'
import { formatPhoneForDisplay } from '@/shared/lib'
import { UsersTableSkeleton } from './UsersTableSkeleton'
import styles from './UsersTable.module.scss'

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

  const renderMobileCard = (user: User) => (
    <Card key={user.id} className={styles.userCard} size="small">
      <div className={styles.userHeader}>
        <span className={styles.userName}>{user.name}</span>
        <Tag color={ROLE_COLORS[user.role]} className={styles.userRole}>
          {user.role}
        </Tag>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>ID: {user.id}</span>
        </div>
        <div className={styles.infoItem}>
          <MailOutlined />
          <span>{user.email}</span>
        </div>
        <div className={styles.infoItem}>
          <PhoneOutlined />
          <span>{formatPhoneForDisplay(user.phone)}</span>
        </div>
      </div>
      <div className={styles.userActions}>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(user)}
          size="small"
        >
          Редактировать
        </Button>
        <UserDeleteButton 
          userId={user.id} 
          userName={user.name} 
          onSuccess={onRefresh} 
        />
      </div>
    </Card>
  )

  if (loading) {
    return <UsersTableSkeleton />
  }

  return (
    <div className={styles.usersTable}>
      <div className={styles.header}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onCreate}
          className={styles.createButton}
        >
          Добавить пользователя
        </Button>
      </div>

      {/* Desktop Table */}
      <div className={styles.tableWrapper}>
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

      {/* Mobile Cards */}
      <div className={styles.mobileUserCard}>
        {users.map(renderMobileCard)}
      </div>
    </div>
  )
}

export const UsersTable = memo(UsersTableComponent)
