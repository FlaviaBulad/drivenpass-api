import { Request, Response } from 'express';
import * as cardService from '../services/cardService';
import { CardData } from '../types/cardTypes';
import * as encryptUtils from '../utils/encryptUtils';

export async function createCard(req: Request, res: Response) {
  const cardData: CardData = req.body;
  const { userId } = res.locals;
  console.log(userId);

  const card = await cardService.createCard(userId, cardData);

  res.status(201).send(card);
}

export async function getAllCards(req: Request, res: Response) {
  const { userId } = res.locals;

  const cardList = await cardService.getAllCards(userId);

  for (let i = 0; i < cardList.length; i++) {
    cardList[i].password = encryptUtils.decryptData(cardList[i].password);
    cardList[i].securityCode = encryptUtils.decryptData(
      cardList[i].securityCode
    );
  }

  res.status(200).send(cardList);
}

export async function getCardById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId } = res.locals;

  const cardList = await cardService.getCardById(userId, id);

  res.status(200).send(cardList);
}

export async function deleteCard(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { userId } = res.locals;

  await cardService.getCardById(userId, id);
  await cardService.deleteCard(id);

  res.status(200).send('Card deleted');
}
