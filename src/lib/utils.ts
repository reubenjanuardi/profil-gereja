import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateIndonesian(dateString?: string | Date | null): string {
  if (!dateString) return '-'
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    return format(date, 'd MMMM yyyy', { locale: id })
  } catch {
    return String(dateString)
  }
}

export function formatDateTimeIndonesian(dateString?: string | Date | null): string {
  if (!dateString) return '-'
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    return format(date, 'd MMMM yyyy, HH:mm', { locale: id }) + ' WIB'
  } catch {
    return String(dateString)
  }
}

export function formatTimeIndonesian(dateString?: string | Date | null): string {
  if (!dateString) return '-'
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    return format(date, 'HH:mm', { locale: id }) + ' WIB'
  } catch {
    return String(dateString)
  }
}
