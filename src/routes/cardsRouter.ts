import { Router } from 'express';

const cardsRouter = Router();

cardsRouter.get('/cards/');
cardsRouter.post('/cards/');
cardsRouter.delete('/cards/');

export default cardsRouter;
