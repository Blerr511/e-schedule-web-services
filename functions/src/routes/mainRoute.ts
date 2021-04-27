import {createStudent} from '@controllers/users/students';
import authMiddleware from '@middlewares/auth.middleware';
import {Router} from 'express';
import {departmentsRoute} from './departaments';
import {lessonsRoute} from './lessons';
import {usersRouter} from './users';

const mainRouter = Router();

mainRouter.put('/users/student', createStudent);

mainRouter.use(authMiddleware);

mainRouter.use('/users', usersRouter);

mainRouter.use('/departments', departmentsRoute);

mainRouter.use('/lessons', lessonsRoute);

export default mainRouter;
