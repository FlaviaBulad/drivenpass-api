import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import * as authService from '../services/authService';

dotenv.config();

export interface IToken {
  id: number;
}

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).send('Token not sent');
  }

  const SECRET: string = process.env.JWT_SECRET ?? '';

  try {
    const payload = jwt.verify(token, SECRET);
    const user = await authService.getUserById((payload as IToken).id);
    if (!user) {
      throw { type: 'unauthorized', message: 'invalid' };
    }
    res.locals.userId = Number(user.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Invalid Token');
  }
}
