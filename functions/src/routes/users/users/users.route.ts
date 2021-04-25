import {Router} from 'express';
import {getMyUser} from '@controllers/users/users';

export const usersRoute = Router();

usersRoute.get('/me', getMyUser);
