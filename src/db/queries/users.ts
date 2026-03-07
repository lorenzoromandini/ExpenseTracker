import { db } from '../index';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { User, UserCreateInput } from '../../types/user';

export async function createUser(input: UserCreateInput): Promise<User> {
  const id = crypto.randomUUID();
  const now = new Date();

  await db.insert(users).values({
    id,
    email: input.email,
    passwordHash: input.passwordHash,
    displayName: input.displayName,
    isVerified: input.isVerified,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id,
    email: input.email,
    passwordHash: input.passwordHash,
    displayName: input.displayName,
    isVerified: input.isVerified,
    createdAt: now,
    updatedAt: now,
    lastSyncedAt: null,
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function updateUser(id: string, updates: Partial<UserCreateInput>): Promise<User> {
  const now = new Date();

  await db
    .update(users)
    .set({
      ...updates,
      updatedAt: now,
    })
    .where(eq(users.id, id));

  const updated = await getUserById(id);
  if (!updated) {
    throw new Error('User not found after update');
  }

  return updated;
}

export async function deleteUser(id: string): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}

export async function listUsers(): Promise<User[]> {
  return await db.select().from(users);
}
