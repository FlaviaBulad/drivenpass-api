import { Router } from 'express';

const safeNotesRouter = Router();

safeNotesRouter.get('/safeNotes/');
safeNotesRouter.post('/safeNotes/');
safeNotesRouter.delete('/safeNotes/');

export default safeNotesRouter;
