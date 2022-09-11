import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';
import { safeNoteSchema } from '../schemas/safeNoteSchema';
import * as safeNoteController from '../controllers/safeNoteController';

const safeNotesRouter = Router();

safeNotesRouter.post(
  '/safeNotes/',
  validateToken(),
  validateSchema(safeNoteSchema),
  safeNoteController.createSafeNote
);
safeNotesRouter.get(
  '/safeNotes/',
  validateToken(),
  safeNoteController.getAllSafeNotes
);
safeNotesRouter.get(
  '/safeNotes/:id',
  validateToken(),
  safeNoteController.getSafeNoteById
);
safeNotesRouter.delete(
  '/safeNotes/:id',
  validateToken(),
  safeNoteController.deletesafeNote
);

export default safeNotesRouter;
