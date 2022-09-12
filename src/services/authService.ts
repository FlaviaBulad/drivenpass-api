import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthData } from '../types/authTypes';
import * as authRepository from '../repositories/authRepository';

dotenv.config();

export async function getUserById(id: number) {
  const user = await authRepository.getUserById(id);

  return user;
}

export async function validateEmail(email: string) {
  const emailExists = await authRepository.getByEmail(email);
  if (emailExists) {
    throw { type: 'conflict', message: 'Email already registered' };
  }
}

export async function validatePasswordLength(password: string) {
  if (password.length < 10) {
    throw {
      type: 'unauthorized',
      message: 'Password must be at least 10 characters'
    };
  }
}

export async function hashPassword(password: string) {
  const SALT: number = Number(process.env.SALT);
  const hashedPassword = bcrypt.hashSync(password, SALT);
  return hashedPassword;
}

export async function validateLogin(authData: AuthData) {
  const { email, password } = authData;

  const emailRegistered = await authRepository.getByEmail(email);
  if (!emailRegistered) {
    throw { type: 'not_found', message: 'Email not registered!' };
  }
  const syncPassword = bcrypt.compareSync(password, emailRegistered.password);
  if (syncPassword === false) {
    throw { type: 'unauthorized', message: 'Email or password incorrect' };
  }
}

export async function createUser(authData: AuthData) {
  const data: AuthData = authData;
  await validateEmail(data.email);
  validatePasswordLength(data.password);
  const hashedPassword: string = await hashPassword(data.password);

  const createData = {
    email: data.email,
    password: hashedPassword
  };
  await authRepository.create(createData);
}

export async function generateToken(authData: AuthData) {
  const user = await authRepository.getByEmail(authData.email);

  const userId = user?.id;

  const SECRET: string = process.env.JWT_SECRET ?? '';
  const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

  const payload = {
    id: userId
  };

  const jwtConfig = {
    expiresIn: EXPIRES_IN
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}

export async function login(authData: AuthData) {
  await validateLogin(authData);
  const token = await generateToken(authData);
  return token;
}
