import {Router} from 'express';
import usersController from '@controllers/users';

export const usersRouter = Router();

usersRouter.get('/createLecturer', usersController.createLecturer);
