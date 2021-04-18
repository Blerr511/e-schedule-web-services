import authMiddleware from '@middlewares/auth.middleware';
import {Router} from 'express';
import {departmentsRoute} from './departaments';
import {usersRouter} from './users';

const mainRouter = Router();

mainRouter.use(authMiddleware);

mainRouter.use('/users', usersRouter);

mainRouter.use('/departments', departmentsRoute);

export default mainRouter;
