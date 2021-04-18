import {Router} from 'express';
import {adminsRoute} from './admins';
import {studentsRoute} from './students';

export const usersRouter = Router();

usersRouter.use('/admin', adminsRoute);
usersRouter.use('/student', studentsRoute);
