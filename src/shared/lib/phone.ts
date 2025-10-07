import { parsePhoneNumberWithError, isValidPhoneNumber, CountryCode } from 'libphonenumber-js'

export function normalizePhone(phone: string, country: CountryCode = 'RU'): string {
  if (!phone) return phone
  
  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)
    return phoneNumber.format('E.164')
  } catch {
    return phone
  }
}

export function formatPhone(phone: string, country: CountryCode = 'RU'): string {
  if (!phone) return phone
  
  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)
    return phoneNumber.formatNational()
  } catch {
    return phone
  }
}

export function isValidPhone(phone: string, country: CountryCode = 'RU'): boolean {
  if (!phone) return false
  
  try {
    return isValidPhoneNumber(phone, country)
  } catch {
    return false
  }
}
