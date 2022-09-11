import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';
import { credentialSchema } from '../schemas/credentialSchema';
import * as credentialController from '../controllers/credentialController';

const credentialsRouter = Router();

credentialsRouter.post(
  '/credentials/',
  validateToken(),
  validateSchema(credentialSchema),
  credentialController.createCredential
);
credentialsRouter.get(
  '/credentials/',
  validateToken(),
  credentialController.getAllCredentials
);
credentialsRouter.get(
  '/credentials/:id',
  validateToken(),
  credentialController.getCredentialById
);
credentialsRouter.delete(
  '/credentials/:id',
  validateToken(),
  credentialController.deleteCredential
);

export default credentialsRouter;
