import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';
import { CredentialData } from '../types/credentialTypes';
import * as encryptUtils from '../utils/encryptUtils';

export async function createCredential(req: Request, res: Response) {
  const credentialData: CredentialData = req.body;
  const { user } = res.locals;
  const credential = await credentialService.createCredential(
    user.userId,
    credentialData
  );

  res.status(201).send(credential);
}

export async function getAllCredentials(req: Request, res: Response) {
  const { userId } = res.locals;
  const credentialsList = await credentialService.getAllCredentials(userId);

  for (let i = 0; i < credentialsList.length; i++) {
    credentialsList[i].password = encryptUtils.decryptData(
      credentialsList[i].password
    );
  }

  res.status(201).send(credentialsList);
}

export async function getCredentialById(req: Request, res: Response) {
  const credentialId = Number(req.params);
  const { userId } = res.locals;

  const credentialList = await credentialService.getCredentialById(
    userId,
    credentialId
  );
  credentialList.password = encryptUtils.decryptData(credentialList.password);

  res.status(201).send(credentialList);
}

export async function deleteCredential(req: Request, res: Response) {
  const credentialId = Number(req.params);
  const { userId } = res.locals;

  await credentialService.getCredentialById(userId, credentialId);
  await credentialService.deleteCredential(credentialId);

  res.status(201).send('Credential deleted');
}
