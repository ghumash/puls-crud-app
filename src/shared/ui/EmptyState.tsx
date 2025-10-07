import { Empty } from 'antd'

interface EmptyStateProps {
  description?: string
}

export function EmptyState({ description = 'Нет данных' }: EmptyStateProps) {
  return <Empty description={description} />
}
