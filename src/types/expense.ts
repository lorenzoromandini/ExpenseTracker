export interface Expense {
  id: string;
  userId: string;
  merchant: string;
  amount: number;
  currency: string;
  date: Date;
  categoryId: string | null;
  notes: string | null;
  receiptImagePath: string | null;
  vatAmount: number | null;
  isManualEntry: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ExpenseCreateInput = Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>;
export type ExpenseUpdateInput = Partial<Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
