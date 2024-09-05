import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getInitials = (name?: string | null) => {
  if (!name) return ''

  const words = name.split(' ')

  if (words.length === 1) {
    return words[0].charAt(0)
  }

  return words[0].charAt(0) + words[words.length - 1].charAt(0)
}