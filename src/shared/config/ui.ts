export const TABLE_PAGINATION_CONFIG = {
  showSizeChanger: false,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) =>
    `${range[0]}-${range[1]} из ${total} записей`,
} as const
