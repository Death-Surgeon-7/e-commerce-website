import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This function is kept for server-side rendering where context is not available.
// The default will be INR.
export const formatPrice = (
  amount: number,
  currency = "INR",
  locale = "en-IN"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
