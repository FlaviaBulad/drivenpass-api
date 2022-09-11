import * as credentialRepository from '../repositories/credentialRepository';
import * as encryptUtils from '../utils/encryptUtils';
import { CredentialData } from '../types/credentialTypes';

async function validateTitle(userId: number, title: string) {
  const titleExists = await credentialRepository.getTitleByUserId(
    userId,
    title
  );
  if (titleExists) {
    throw { type: 'conflict', message: 'Title already exists, try another' };
  }
}

export async function createCredential(
  userId: number,
  credentialData: CredentialData
) {
  await validateTitle(userId, credentialData.title);
  const encryptedPassword = encryptUtils.encryptData(credentialData.password);
  await credentialRepository.createCredential(userId, {
    ...credentialData,
    password: encryptedPassword
  });

  await credentialRepository.createCredential(userId, credentialData);
}

export async function getAllCredentials(userId: number) {
  const credentialList = await credentialRepository.getAllCredentialsByUserId(
    userId
  );
  return credentialList;
}

export async function getCredentialById(userId: number, credentialId: number) {
  const credentialList = await credentialRepository.getCredentialById(
    userId,
    credentialId
  );
  if (!credentialList) {
    throw {
      type: 'not_found',
      message: 'Credential not found'
    };
  }
  return credentialList;
}

export async function deleteCredential(credentialId: number) {
  await credentialRepository.deleteCredentialById(credentialId);
}
