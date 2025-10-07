import '@ant-design/v5-patch-for-react-19'
import type { Metadata } from 'next'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import './globals.scss'

export const metadata: Metadata = {
  title: 'PULS CRUD - Управление пользователями',
  description: 'Production-уровень CRUD-приложение на Next.js с FSD архитектурой',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <ConfigProvider locale={ruRU}>{children}</ConfigProvider>
      </body>
    </html>
  )
}
