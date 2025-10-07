import { useEffect } from 'react'
import type { UserForm } from '@/entities/user'
import { normalizePhone } from '@/shared/lib'
import { useUserForm } from './useUserForm'

interface UseUserModalParams {
  defaultValues?: Partial<UserForm>
  onSubmit: (data: UserForm) => Promise<void>
  onCancel: () => void
}

export function useUserModal({ defaultValues, onSubmit, onCancel }: UseUserModalParams) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useUserForm()

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const handleFormSubmit = async (data: UserForm) => {
    const normalizedData = {
      ...data,
      phone: normalizePhone(data.phone),
    }
    await onSubmit(normalizedData)
  }

  const handleModalCancel = () => {
    reset()
    onCancel()
  }

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleCancel: handleModalCancel,
  }
}
