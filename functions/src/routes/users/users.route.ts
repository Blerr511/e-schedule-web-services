import {Router} from 'express';
import {createLecturer, setUserSettings} from '@controllers/users';

export const usersRouter = Router();

usersRouter.post('/createLecturer', createLecturer);
usersRouter.post('/setUserSettings', setUserSettings);
