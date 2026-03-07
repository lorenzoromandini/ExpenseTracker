export interface User {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string | null;
  isVerified: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date | null;
}

export type AuthenticatedUser = User;

export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastSyncedAt'>;
