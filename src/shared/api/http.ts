import axios from 'axios'
import { config } from '@/shared/config'

export const http = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Просто возвращаем ошибку, обработка UI сделана в feature слоях
    return Promise.reject(error)
  }
)
