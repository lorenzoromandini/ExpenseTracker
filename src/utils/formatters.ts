/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency: string = 'EUR', locale: string = 'it-IT'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a date for display
 */
export function formatDate(date: Date, locale: string = 'it-IT'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse a date string from input
 */
export function parseDateInput(dateString: string): Date | null {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  return date;
}

/**
 * Format relative date (today, yesterday, etc.)
 */
export function formatRelativeDate(date: Date, locale: string = 'it-IT'): string {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return locale === 'it' ? 'Oggi' : 'Today';
  } else if (diffDays === 1) {
    return locale === 'it' ? 'Ieri' : 'Yesterday';
  } else if (diffDays < 7) {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  } else {
    return formatDate(date, locale);
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
