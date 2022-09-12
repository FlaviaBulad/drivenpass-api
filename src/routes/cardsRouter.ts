import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';
import { cardSchema } from '../schemas/cardSchema';
import * as cardController from '../controllers/cardController';

const cardsRouter = Router();

cardsRouter.post(
  '/cards/',
  validateToken,
  validateSchema(cardSchema),
  cardController.createCard
);
cardsRouter.get('/cards/', validateToken, cardController.getAllCards);
cardsRouter.get('/cards/:id', validateToken, cardController.getCardById);
cardsRouter.delete('/cards/:id', validateToken, cardController.deleteCard);

export default cardsRouter;
