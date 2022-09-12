import client from '../config/prismaClient';
import { CardData } from '../types/cardTypes';

export async function createCard(userId: number, cardData: CardData) {
  const cardInfo = { userId, ...cardData };
  return client.cards.create({ data: cardInfo });
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

// postgres://wsyjhcsjlmdiia:b5a8f0f24befc642faff939e752a03d67d77df24468c563258d950154f8bc3ca@ec2-34-200-205-45.compute-1.amazonaws.com:5432/d7vt52mfvbege2
