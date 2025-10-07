import { parsePhoneNumber, CountryCode } from 'libphonenumber-js'

export function normalizePhone(phone: string, country: CountryCode = 'RU'): string {
  try {
    const phoneNumber = parsePhoneNumber(phone, country)
    return phoneNumber.format('E.164')
  } catch {
    return phone
  }
}

export function formatPhone(phone: string, country: CountryCode = 'RU'): string {
  try {
    const phoneNumber = parsePhoneNumber(phone, country)
    return phoneNumber.formatNational()
  } catch {
    return phone
  }
}

export function isValidPhone(phone: string, country: CountryCode = 'RU'): boolean {
  try {
    const phoneNumber = parsePhoneNumber(phone, country)
    return phoneNumber.isValid()
  } catch {
    return false
  }
}
