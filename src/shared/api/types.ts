export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}
