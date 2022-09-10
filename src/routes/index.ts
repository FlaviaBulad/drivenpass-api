import { Router } from 'express';

import authRouter from './authRouter';
import cardsRouter from './cardsRouter';
import credentialsRouter from './credentialsRouter';
import safeNotesRouter from './safeNotesRouter';
import wifiRouter from './wifiRouter';

const router = Router();

router.use(authRouter);
router.use(cardsRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(wifiRouter);

export default router;
