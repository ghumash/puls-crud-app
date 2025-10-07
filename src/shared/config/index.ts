export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  pagination: {
    defaultPageSize: 10,
  },
} as const
