import client from '../config/prismaClient';
import { AuthData } from '../types/authTypes';

export async function create(authData: AuthData) {
  return client.users.create({ data: authData });
}

export async function getByEmail(email: string) {
  return client.users.findFirst({ where: { email } });
}

export async function getUserById(id: number) {
  return client.users.findFirst({ where: { id } });
}
