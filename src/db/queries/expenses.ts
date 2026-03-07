import { db } from '../index';
import { expenses } from '../schema';
import { eq, desc, gte, lte, and } from 'drizzle-orm';
import type { Expense, ExpenseCreateInput, ExpenseUpdateInput } from '../../types/expense';

export { type Expense, type ExpenseCreateInput, type ExpenseUpdateInput };

export async function createExpense(input: ExpenseCreateInput): Promise<Expense> {
  const id = crypto.randomUUID();
  const now = new Date();

  await db.insert(expenses).values({
    id,
    userId: input.userId,
    merchant: input.merchant,
    amount: input.amount,
    currency: input.currency,
    date: input.date,
    categoryId: input.categoryId,
    notes: input.notes,
    receiptImagePath: input.receiptImagePath,
    vatAmount: input.vatAmount,
    isManualEntry: input.isManualEntry,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id,
    userId: input.userId,
    merchant: input.merchant,
    amount: input.amount,
    currency: input.currency,
    date: input.date,
    categoryId: input.categoryId,
    notes: input.notes,
    receiptImagePath: input.receiptImagePath,
    vatAmount: input.vatAmount,
    isManualEntry: input.isManualEntry,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getExpenseById(id: string): Promise<Expense | null> {
  const result = await db.select().from(expenses).where(eq(expenses.id, id)).limit(1);
  if (!result[0]) return null;
  return result[0] as Expense;
}

export async function getExpensesByUser(userId: string): Promise<Expense[]> {
  return await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, userId))
    .orderBy(desc(expenses.date));
}

export async function updateExpense(id: string, updates: ExpenseUpdateInput): Promise<Expense> {
  const now = new Date();

  await db
    .update(expenses)
    .set({
      ...updates,
      updatedAt: now,
    })
    .where(eq(expenses.id, id));

  const updated = await getExpenseById(id);
  if (!updated) {
    throw new Error('Expense not found after update');
  }

  return updated;
}

export async function deleteExpense(id: string): Promise<void> {
  await db.delete(expenses).where(eq(expenses.id, id));
}

export async function getExpensesByDateRange(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<Expense[]> {
  return await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        gte(expenses.date, startDate),
        lte(expenses.date, endDate)
      )
    )
    .orderBy(desc(expenses.date));
}
