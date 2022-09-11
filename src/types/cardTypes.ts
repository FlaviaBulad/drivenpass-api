import { Cards, CardTypes } from '@prisma/client';

export type CardData = Omit<Cards, 'id' | 'userId'>;
