'use client'

import { Form, Input, Select } from 'antd'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import type { UserForm } from '@/entities/user'
import { ROLE_OPTIONS } from '@/entities/user'
import { normalizePhone, getPhonePlaceholder } from '@/shared/lib'
import styles from './UserFormFields.module.scss'

interface UserFormFieldsProps {
  control: Control<UserForm>
  errors: FieldErrors<UserForm>
}

interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <Form.Item label={label} validateStatus={error ? 'error' : ''} help={error}>
      {children}
    </Form.Item>
  )
}

export function UserFormFields({ control, errors }: UserFormFieldsProps) {
  return (
    <Form layout="vertical" className={styles.userForm}>
      <FormField label="Имя" error={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Введите имя" />}
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="example@email.com" />}
        />
      </FormField>

      <FormField label="Телефон" error={errors.phone?.message}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={getPhonePlaceholder()}
              onBlur={(e) => {
                const normalized = normalizePhone(e.target.value)
                field.onChange(normalized)
                field.onBlur()
              }}
            />
          )}
        />
      </FormField>

      <FormField label="Роль" error={errors.role?.message}>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите роль">
              {ROLE_OPTIONS.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </FormField>
    </Form>
  )
}
