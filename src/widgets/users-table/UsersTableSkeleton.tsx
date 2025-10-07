import { Skeleton, Button, Table, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { memo } from 'react'

function UsersTableSkeletonComponent() {
  const skeletonColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: () => <Skeleton.Input active size="small" style={{ width: 40 }} />,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: () => <Skeleton.Input active size="small" style={{ width: 120 }} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: () => <Skeleton.Input active size="small" style={{ width: 180 }} />,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: () => <Skeleton.Input active size="small" style={{ width: 140 }} />,
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: () => <Skeleton.Button active size="small" shape="round" style={{ width: 60 }} />,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: () => (
        <Space size="small">
          <Skeleton.Button active size="small" shape="circle" />
          <Skeleton.Button active size="small" shape="circle" />
        </Space>
      ),
    },
  ]

  const skeletonData = Array.from({ length: 10 }, (_, index) => ({
    key: index,
    id: index,
  }))

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} disabled>
          Добавить пользователя
        </Button>
      </div>

      <Table
        columns={skeletonColumns}
        dataSource={skeletonData}
        pagination={false}
        loading={false}
        rowKey="key"
      />

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Skeleton.Button active size="small" style={{ width: 200 }} />
      </div>
    </div>
  )
}

export const UsersTableSkeleton = memo(UsersTableSkeletonComponent)
