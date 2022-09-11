import client from '../config/prismaClient';
import { CredentialData } from '../types/credentialTypes';

export async function createCredential(
  userId: number,
  credentialData: CredentialData
) {
  const credentialInfo = {
    userId,
    ...credentialData
  };
  return client.credentials.create({
    data: credentialInfo
  });
}

export async function getTitleByUserId(userId: number, title: string) {
  return client.credentials.findFirst({
    where: {
      userId,
      title
    }
  });
}

export async function getAllCredentialsByUserId(userId: number) {
  return client.credentials.findMany({
    where: {
      userId
    }
  });
}

export async function getCredentialById(userId: number, id: number) {
  return client.credentials.findFirst({
    where: {
      userId,
      id
    }
  });
}

export async function deleteCredentialById(id: number) {
  return client.credentials.delete({
    where: {
      id
    }
  });
}
