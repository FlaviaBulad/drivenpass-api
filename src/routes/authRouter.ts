import { Router } from 'express';

import * as authController from '../controllers/authController';
import validateSchema from '../middlewares/validateSchema';
import { loginSchema, registerSchema } from '../schemas/authSchema';

const authRouter = Router();

authRouter.post('/', validateSchema(loginSchema), authController.login); // login using jwt
authRouter.post(
  '/register',
  validateSchema(registerSchema),
  authController.createUser
);

export default authRouter;
