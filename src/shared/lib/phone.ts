import { parsePhoneNumberWithError, isValidPhoneNumber, CountryCode } from 'libphonenumber-js'

const DEFAULT_COUNTRY: CountryCode = 'RU'
const PHONE_FORMAT_EXAMPLE = '+79991234567'

export function normalizePhone(phone: string, country: CountryCode = DEFAULT_COUNTRY): string {
  if (!phone) return phone

  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)
    return phoneNumber.format('E.164')
  } catch {
    return phone
  }
}

export function isValidPhone(phone: string, country: CountryCode = DEFAULT_COUNTRY): boolean {
  if (!phone) return false

  try {
    return isValidPhoneNumber(phone, country)
  } catch {
    return false
  }
}

export function formatPhoneForDisplay(
  phone: string,
  country: CountryCode = DEFAULT_COUNTRY
): string {
  if (!phone) return phone

  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)
    return phoneNumber.formatNational()
  } catch {
    return phone
  }
}

export function getPhoneValidationMessage(country: CountryCode = DEFAULT_COUNTRY): string {
  if (country === 'RU') {
    return `Формат: ${PHONE_FORMAT_EXAMPLE}`
  }
  return 'Некорректный формат телефона'
}

export function getPhonePlaceholder(country: CountryCode = DEFAULT_COUNTRY): string {
  if (country === 'RU') {
    return PHONE_FORMAT_EXAMPLE
  }
  return 'Введите телефон'
}

export { DEFAULT_COUNTRY, PHONE_FORMAT_EXAMPLE }
