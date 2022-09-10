import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function validateToken() {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1 - get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send('Token not sent');
    }

    const SECRET: string = process.env.JWT_SECRET ?? '';

    try {
      // 2 - Validate token
      jwt.verify(token, SECRET);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send('Invalid Token');
    }
  };
}
