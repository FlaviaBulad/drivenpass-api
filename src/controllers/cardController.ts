import { Request, Response } from 'express';
import * as cardService from '../services/cardService';
import { CardData } from '../types/cardTypes';

export async function createCard(req: Request, res: Response) {
  const cardData: CardData = req.body;
  const { userId } = res.locals;

  const card = await cardService.createCard(userId, cardData);

  res.status(201).send(card);
}

export async function getAllCards(req: Request, res: Response) {
  const { userId } = res.locals;

  const cardList = await cardService.getAllCards(userId);

  res.status(200).send(cardList);
}

export async function getCardById(req: Request, res: Response) {
  const cardId = Number(req.params);
  const { userId } = res.locals;

  const cardList = await cardService.getCardById(userId, cardId);

  res.status(201).send(cardList);
}

export async function deleteCard(req: Request, res: Response) {
  const cardId: number = Number(req.params);
  const { userId } = res.locals;

  await cardService.deleteCard(cardId, userId);

  res.status(200).send('Card deleted');
}
