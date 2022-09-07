import { Router } from 'express';

const authRouter = Router();

authRouter.post('/'); // login using jwt
authRouter.post('/register');
authRouter.delete('/logout');

export default authRouter;
