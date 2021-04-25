import {Router} from 'express';
import {adminsRoute} from './admins';
import {studentsRoute} from './students';
import {usersRoute} from './users';

export const usersRouter = Router();

usersRouter.use('/admin', adminsRoute);
usersRouter.use('/student', studentsRoute);

usersRoute.use(usersRoute);
