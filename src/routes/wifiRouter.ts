import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import * as wifiController from '../controllers/wifiController';
import validateSchema from '../middlewares/validateSchema';
import { wifiSchema } from '../schemas/wifiSchema';

const wifiRouter = Router();

wifiRouter.post(
  '/wifi/',
  validateToken(),
  validateSchema(wifiSchema),
  wifiController.createWifi
);
wifiRouter.get('/wifi/', validateToken(), wifiController.getAllwifis);
wifiRouter.get('/wifi/:id', validateToken(), wifiController.getWifiById);
wifiRouter.delete('/wifi/:id', validateToken(), wifiController.deleteWifi);

export default wifiRouter;
