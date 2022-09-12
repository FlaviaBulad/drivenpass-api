import { Request, Response } from 'express';
import * as safeNoteService from '../services/safeNoteService';
import { SafeNotesData } from '../types/safeNotesTypes';
import * as encryptUtils from '../utils/encryptUtils';

export async function createSafeNote(req: Request, res: Response) {
  const safeNoteData: SafeNotesData = req.body;
  const { userId } = res.locals;
  const safeNote = await safeNoteService.createSafeNote(userId, safeNoteData);

  res.status(201).send(safeNote);
}

export async function getAllSafeNotes(req: Request, res: Response) {
  const { userId } = res.locals;
  const safeNoteList = await safeNoteService.getAllSafeNotes(userId);

  for (let i = 0; i < safeNoteList.length; i++) {
    safeNoteList[i].note = encryptUtils.decryptData(safeNoteList[i].note);
  }

  res.status(200).send(safeNoteList);
}

export async function getSafeNoteById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId } = res.locals;

  const safeNoteList = await safeNoteService.getSafeNoteById(userId, id);
  safeNoteList.note = encryptUtils.decryptData(safeNoteList.note);

  res.status(200).send(safeNoteList);
}

export async function deletesafeNote(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId } = res.locals;

  await safeNoteService.getSafeNoteById(userId, id);
  await safeNoteService.deleteSafeNote(id);

  res.status(200).send('Note deleted');
}
