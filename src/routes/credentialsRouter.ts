import { Router } from 'express';

const credentialsRouter = Router();

credentialsRouter.get('/credentials/');
credentialsRouter.post('/credentials/');
credentialsRouter.delete('/credentials/');

export default credentialsRouter;
