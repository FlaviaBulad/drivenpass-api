import { users } from '@prisma/client';

export type AuthData = Omit<users, 'id' | 'createdAt'>;
