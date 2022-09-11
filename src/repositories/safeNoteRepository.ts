import client from '../config/prismaClient';
import { SafeNotesData } from '../types/safeNotesTypes';

export async function createSafeNote(
  userId: number,
  safeNotesData: SafeNotesData
) {
  const safeNotesInfo = {
    userId,
    ...safeNotesData
  };
  return client.safeNotes.create({
    data: safeNotesInfo
  });
}

export async function getTitleByUserId(userId: number, title: string) {
  return client.safeNotes.findFirst({
    where: {
      userId,
      title
    }
  });
}

export async function getAllSafeNotesByUserId(userId: number) {
  return client.safeNotes.findMany({
    where: {
      userId
    }
  });
}

export async function getSafeNoteById(userId: number, id: number) {
  return client.safeNotes.findFirst({
    where: {
      userId,
      id
    }
  });
}

export async function deleteSafeNoteById(id: number) {
  return client.safeNotes.delete({
    where: {
      id
    }
  });
}
