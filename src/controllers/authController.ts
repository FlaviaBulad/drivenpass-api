import { Request, Response } from 'express';
import * as authService from '../services/authService';

import { AuthData } from '../types/authTypes';

export async function createUser(req: Request, res: Response) {
  const authData: AuthData = req.body;
  const createUser = await authService.createUser(authData);
  res.status(201).send(createUser);
}

export async function login(req: Request, res: Response) {
  const authData: AuthData = req.body;

  const data = await authService.login(authData);

  res.status(201).send(data);
}
