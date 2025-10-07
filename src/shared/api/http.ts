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
    return Promise.reject(error)
  }
)
