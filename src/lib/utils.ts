import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function countDiscountedPrice(price: number, discountPercentage: number) {
  return Math.round((price - price * discountPercentage / 100) * 100) / 100
}