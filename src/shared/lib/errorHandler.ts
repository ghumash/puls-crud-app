import { message } from 'antd'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export function handleApiError(error: unknown, defaultMessage = 'Произошла ошибка'): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as { response?: { data?: ApiError; status?: number } }
    const errorMessage = apiError.response?.data?.message || defaultMessage
    return errorMessage
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return defaultMessage
}

export function showApiError(error: unknown, defaultMessage?: string): void {
  const errorMessage = handleApiError(error, defaultMessage)
  message.error(errorMessage)
}

export function showSuccessMessage(text: string): void {
  message.success(text)
}
