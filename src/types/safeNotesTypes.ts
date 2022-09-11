import { SafeNotes } from '@prisma/client';

export type SafeNotesData = Omit<SafeNotes, 'id' | 'userId'>;
