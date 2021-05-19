import authMiddleware from '@middlewares/auth.middleware';
import {Router} from 'express';
import {scheduleRouter} from './schedule';

const mainRouter = Router();

mainRouter.use(authMiddleware);

mainRouter.use('/schedule', scheduleRouter);

export default mainRouter;
