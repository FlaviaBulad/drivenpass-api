import client from '../config/prismaClient';
import { WifiData } from '../types/wifiTypes';

export async function createWifi(userId: number, wifiData: WifiData) {
  const wifiInfo = {
    userId,
    ...wifiData
  };
  return client.wifi.create({
    data: wifiInfo
  });
}

export async function getTitleByUserId(userId: number, title: string) {
  return client.wifi.findFirst({
    where: {
      userId,
      title
    }
  });
}

export async function getAllWifisByUserId(userId: number) {
  return client.wifi.findMany({
    where: {
      userId
    }
  });
}

export async function getWifiById(userId: number, id: number) {
  return client.wifi.findFirst({
    where: {
      userId,
      id
    }
  });
}

export async function deleteWifiById(id: number) {
  return client.wifi.delete({
    where: {
      id
    }
  });
}
