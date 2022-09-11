import * as safeNoteRepository from '../repositories/safeNoteRepository';
import * as encryptUtils from '../utils/encryptUtils';
import { SafeNotesData } from '../types/safeNotesTypes';

async function validateTitle(userId: number, title: string) {
  const titleExists = await safeNoteRepository.getTitleByUserId(userId, title);
  if (titleExists) {
    throw { type: 'conflict', message: 'Title already exists, try another' };
  }
}

export async function createSafeNote(
  userId: number,
  safeNotesData: SafeNotesData
) {
  await validateTitle(userId, safeNotesData.title);
  const encryptedNote = encryptUtils.encryptData(safeNotesData.note);
  await safeNoteRepository.createSafeNote(userId, {
    ...safeNotesData,
    note: encryptedNote
  });

  await safeNoteRepository.createSafeNote(userId, safeNotesData);
}

export async function getAllSafeNotes(userId: number) {
  const safeNoteList = await safeNoteRepository.getAllSafeNotesByUserId(userId);
  return safeNoteList;
}

export async function getSafeNoteById(userId: number, safeNoteId: number) {
  const safeNoteList = await safeNoteRepository.getSafeNoteById(
    userId,
    safeNoteId
  );
  if (!safeNoteList) {
    throw {
      type: 'not_found',
      message: 'SafeNote not found'
    };
  }
  return safeNoteList;
}

export async function deleteSafeNote(safeNoteId: number) {
  await safeNoteRepository.deleteSafeNoteById(safeNoteId);
}
