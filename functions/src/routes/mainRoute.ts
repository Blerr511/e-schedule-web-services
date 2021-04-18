import authMiddleware from '@middlewares/auth.middleware';
import {Router} from 'express';
import {usersRouter} from './users';

const mainRouter = Router();

mainRouter.use(authMiddleware);

mainRouter.use('/users', usersRouter);

export default mainRouter;
