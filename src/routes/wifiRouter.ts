import { Router } from 'express';

const wifiRouter = Router();

wifiRouter.get('/wifi/');
wifiRouter.post('/wifi/');
wifiRouter.delete('/wifi/');

export default wifiRouter;
