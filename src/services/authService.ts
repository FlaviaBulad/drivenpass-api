import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { AuthData } from '../types/authTypes';
import * as authRepository from '../repositories/authRepository';

dotenv.config();

export async function validateEmail(email: string) {
    const emailExists = await authRepository.getByEmail(email);
    if (emailExists){
        throw (type: 'conflict', message: 'Email already registered');
    }
}

export async function hashPassword(password: string) {
    const SALT = process.env.SALT;
    const hashedPassword = bcrypt.hashSync(password, SALT);
    return hashedPassword;
}

export async function validatePasswordLength(password: string) {
    if(password.length < 10){
        throw (type: 'bad_request', message: 'Password must be at least 10 characters');
    }
}

export async function checkIfEmailIsNotRegistered(email: string){
    const emailRegistered = await authRepository.getByEmail(email)
    if (!emailRegistered){
        throw (type: 'not_found', message: 'Email not registered!')
    }
}

export async function syncHashedPassword(password: string){

}

export async function createUser(authData: AuthData) {
  const data: AuthData = authData;
  await validateEmail(data.email);
  validatePasswordLength(data.password);
  const hashedPassword: string = await hashPassword(data.password);

const createData = {
    email: data.email,
    password: hashedPassword
}
  await authRepository.create(createData);
}

export async function login(authData: AuthData) {
 await checkIfEmailIsNotRegistered(authData.email);
 await syncHashedPassword(authData.password);

    const SECRET: string = process.env.JWT_SECRET ?? '';
    const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    const payload = {
      id: 1,
      email: authData.email
    };

    const jwtConfig = {
      expiresIn: EXPIRES_IN
    };

    const token = jwt.sign(payload, SECRET, jwtConfig);

    return token;
  
}
