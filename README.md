# PULS CRUD

CRUD-приложение для управления пользователями на Next.js с FSD архитектурой.

## Технологии

- Next.js 15 (App Router) + React 19 + TypeScript
- Ant Design 5 + Sass + React Hook Form + Zod
- Axios + libphonenumber-js + Bun

## Структура (FSD)

```
src/
├── app/           # Next.js App Router  
├── shared/        # API, конфиг, утилиты
├── entities/user/ # Типы, схемы, API
├── features/      # CRUD функции
├── widgets/       # Таблица пользователей
└── pages/         # Композиция
```

## Функции

- CRUD операции с валидацией
- Пагинация (10 записей)
- Нормализация телефонов
- Обработка ошибок

## Установка

```bash
git clone <repo>
cd puls-app
bun install

# Настройка
cp env.example .env.local
# Укажите MockAPI URL в NEXT_PUBLIC_API_BASE_URL

# Запуск
bun run dev
```

## Скрипты

```bash
bun run dev        # Разработка
bun run build      # Сборка
bun run lint       # Линтер
bun run typecheck  # TypeScript
```