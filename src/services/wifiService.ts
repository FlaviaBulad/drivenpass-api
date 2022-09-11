import * as wifiRepository from '../repositories/wifiRepository';
import * as encryptUtils from '../utils/encryptUtils';
import { WifiData } from '../types/wifiTypes';

async function validateTitle(userId: number, title: string) {
  const titleExists = await wifiRepository.getTitleByUserId(userId, title);
  if (titleExists) {
    throw { type: 'conflict', message: 'Title already exists, try another' };
  }
}

export async function createWifi(userId: number, wifiData: WifiData) {
  await validateTitle(userId, wifiData.title);
  const encryptedPassword = encryptUtils.encryptData(wifiData.password);
  await wifiRepository.createWifi(userId, {
    ...wifiData,
    password: encryptedPassword
  });

  await wifiRepository.createWifi(userId, wifiData);
}

export async function getAllWifis(userId: number) {
  const wifiList = await wifiRepository.getAllWifisByUserId(userId);
  return wifiList;
}

export async function getWifiById(userId: number, WifiId: number) {
  const wifiList = await wifiRepository.getWifiById(userId, WifiId);
  if (!wifiList) {
    throw {
      type: 'not_found',
      message: 'Wifi not found'
    };
  }
  return wifiList;
}

export async function deleteWifi(wifiId: number) {
  await wifiRepository.deleteWifiById(wifiId);
}
