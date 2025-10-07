import axios from 'axios'
import { config } from '@/shared/config'
import { message } from 'antd'

export const http = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    message.error(`API Error: ${error.response?.data || error.message}`)
    return Promise.reject(error)
  }
)
