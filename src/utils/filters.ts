import { Expense } from '../db/queries/expenses';

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export interface FilterOptions {
  categoryId?: string | null;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  searchText?: string;
}

/**
 * Filter and sort expenses
 */
export function filterAndSortExpenses(
  expenses: Expense[],
  filters: FilterOptions = {},
  sortBy: SortOption = 'date-desc'
): Expense[] {
  let result = [...expenses];

  // Filter by category
  if (filters.categoryId !== undefined) {
    if (filters.categoryId === null) {
      // Show uncategorized
      result = result.filter(e => !e.categoryId);
    } else {
      result = result.filter(e => e.categoryId === filters.categoryId);
    }
  }

  // Filter by date range
  if (filters.startDate) {
    result = result.filter(e => e.date >= filters.startDate!);
  }
  if (filters.endDate) {
    result = result.filter(e => e.date <= filters.endDate!);
  }

  // Filter by amount range
  if (filters.minAmount !== undefined) {
    result = result.filter(e => e.amount >= filters.minAmount!);
  }
  if (filters.maxAmount !== undefined) {
    result = result.filter(e => e.amount <= filters.maxAmount!);
  }

  // Filter by search text (merchant name)
  if (filters.searchText && filters.searchText.trim()) {
    const search = filters.searchText.toLowerCase().trim();
    result = result.filter(e =>
      e.merchant.toLowerCase().includes(search) ||
      e.notes?.toLowerCase().includes(search)
    );
  }

  // Sort
  result.sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return a.date.getTime() - b.date.getTime();
      case 'date-desc':
        return b.date.getTime() - a.date.getTime();
      case 'amount-asc':
        return a.amount - b.amount;
      case 'amount-desc':
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  return result;
}

/**
 * Calculate total for a list of expenses
 */
export function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

/**
 * Group expenses by date
 */
export function groupExpensesByDate(expenses: Expense[]): Record<string, Expense[]> {
  const groups: Record<string, Expense[]> = {};

  expenses.forEach(expense => {
    const dateKey = expense.date.toISOString().split('T')[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(expense);
  });

  return groups;
}
