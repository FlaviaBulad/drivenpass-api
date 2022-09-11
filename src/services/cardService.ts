import { CardData } from '../types/cardTypes';

import * as cardRepository from '../repositories/cardRepository';
import * as encryptUtils from '../utils/encryptUtils';

async function validateTitle(userId: number, title: string) {
  const titleExists = await cardRepository.getTitleByUserId(userId, title);
  if (titleExists) {
    throw { type: 'conflict', message: 'Title already exists, try another' };
  }
}

export async function createCard(userId: number, cardData: CardData) {
  await validateTitle(userId, cardData.title);
  const encryptedPassword = encryptUtils.encryptData(cardData.password);
  const encryptedSecurityCode = encryptUtils.encryptData(cardData.securityCode);
  const card: CardData = {
    ...cardData,
    password: encryptedPassword,
    securityCode: encryptedSecurityCode
  };

  await cardRepository.createCard(userId, card);
}

function decryptCardData(cardList: CardData[]) {
  const decryptedInfo = cardList.map((card) => ({
    ...cardList,
    password: encryptUtils.decryptData(card.password),
    securityCode: encryptUtils.decryptData(card.securityCode)
  }));
  return decryptedInfo;
}

export async function getAllCards(userId: number) {
  const cardsList: CardData[] = await cardRepository.getAllCardsByUserId(
    userId
  );

  const decryptedCards = decryptCardData(cardsList);
  return decryptedCards;
}

export async function getCardById(userId: number, cardId: number) {
  const card = await cardRepository.getCardById(userId, cardId);

  if (!card) {
    throw { type: 'not_found', message: 'Card not found' };
  }
  card.password = encryptUtils.decryptData(card.password);
  card.securityCode = encryptUtils.decryptData(card.securityCode);
  return card;
}

export async function deleteCard(cardId: number, userId: number) {
  await cardRepository.deleteCardById(cardId);
}
