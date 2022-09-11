import client from '../config/prismaClient';
import { CardData } from '../types/cardTypes';

export async function createCard(userId: number, cardData: CardData) {
  const data = { userId, ...cardData };
  return client.cards.create({ data });
}

export async function getTitleByUserId(userId: number, title: string) {
  return client.cards.findFirst({
    where: {
      userId,
      title
    }
  });
}

export async function getAllCardsByUserId(userId: number) {
  return client.cards.findMany({
    where: {
      userId
    }
  });
}

export async function getCardById(userId: number, id: number) {
  return client.cards.findFirst({
    where: {
      userId,
      id
    }
  });
}

export async function deleteCardById(id: number) {
  return client.cards.delete({
    where: {
      id
    }
  });
}
