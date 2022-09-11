import { Request, Response } from 'express';
import * as wifiService from '../services/wifiService';
import { WifiData } from '../types/wifiTypes';
import * as encryptUtils from '../utils/encryptUtils';

export async function createWifi(req: Request, res: Response) {
  const wifiData: WifiData = req.body;
  const { userId } = res.locals;
  const wifi = await wifiService.createWifi(userId, wifiData);

  res.status(201).send(wifi);
}

export async function getAllwifis(req: Request, res: Response) {
  const { userId } = res.locals;
  const wifiList = await wifiService.getAllWifis(userId);

  for (let i = 0; i < wifiList.length; i++) {
    wifiList[i].password = encryptUtils.decryptData(wifiList[i].password);
  }

  res.status(201).send(wifiList);
}

export async function getWifiById(req: Request, res: Response) {
  const wifiId = Number(req.params);
  const { userId } = res.locals;

  const wifiList = await wifiService.getWifiById(userId, wifiId);
  wifiList.password = encryptUtils.decryptData(wifiList.password);

  res.status(201).send(wifiList);
}

export async function deleteWifi(req: Request, res: Response) {
  const wifiId = Number(req.params);
  const { userId } = res.locals;

  await wifiService.getWifiById(userId, wifiId);
  await wifiService.deleteWifi(wifiId);

  res.status(201).send('wifi info deleted');
}
